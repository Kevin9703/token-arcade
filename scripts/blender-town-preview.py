"""Render one library asset without changing the editable library or game GLBs.

blender --background --python scripts/blender-town-preview.py -- --asset house-0
"""
import argparse
import sys
from pathlib import Path
import bpy
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--asset', default='house-0')
parser.add_argument('--source', help='Preview a GLB directly without opening or changing either library')
args = parser.parse_args(sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else [])
if args.source:
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=str(ROOT / args.source))
    objects = set(bpy.data.objects) - before
    for obj in objects:
        if obj.type == 'MESH' and obj.data.color_attributes:
            for mat in obj.data.materials:
                if mat and mat.use_nodes:
                    for node in mat.node_tree.nodes:
                        if node.type == 'VERTEX_COLOR': node.layer_name = obj.data.color_attributes[0].name
else:
    bpy.ops.wm.open_mainfile(filepath=str(ROOT / 'art/token-town-library.blend'))
    collection = bpy.data.collections.get('asset:' + args.asset)
    if collection is None:
        raise ValueError('Unknown asset: ' + args.asset)
    objects = set(collection.all_objects)
    for obj in bpy.data.objects:
        obj.hide_render = obj not in objects
    offset = collection['library_offset']
    for obj in objects:
        if obj.parent not in objects:
            obj.location.x -= offset[0]
            obj.location.y -= offset[1]

scene = bpy.context.scene
scene.render.engine = 'CYCLES'
scene.cycles.device = 'CPU'
scene.cycles.samples = 24
scene.cycles.use_denoising = True
scene.render.resolution_x = 1024
scene.render.resolution_y = 1024
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = 'PNG'
scene.view_settings.view_transform = 'AgX'
scene.world = bpy.data.worlds.new('Preview studio')
scene.world.use_nodes = True
scene.world.node_tree.nodes.clear()
background = scene.world.node_tree.nodes.new('ShaderNodeBackground')
output = scene.world.node_tree.nodes.new('ShaderNodeOutputWorld')
background.inputs['Color'].default_value = (.73, .78, .67, 1)
background.inputs['Strength'].default_value = .6
scene.world.node_tree.links.new(background.outputs[0], output.inputs['Surface'])

bpy.ops.mesh.primitive_plane_add(size=200, location=(0, 0, -.015))
floor = bpy.context.object
floor.name = 'Preview floor'
material = bpy.data.materials.new('Preview sage')
material.diffuse_color = (.55, .62, .46, 1)
floor.data.materials.append(material)
for name, position, power, size in [('Key', (-3, -4, 7), 800, 4), ('Fill', (5, -1, 4), 180, 5)]:
    light = bpy.data.lights.new(name, 'AREA')
    light.energy = power
    light.shape = 'DISK'
    light.size = size
    obj = bpy.data.objects.new(name, light)
    scene.collection.objects.link(obj)
    obj.location = position
    obj.rotation_euler = (Vector((0, 0, 1)) - obj.location).to_track_quat('-Z', 'Y').to_euler()
camera = bpy.data.cameras.new('Preview camera')
camera.type = 'ORTHO'
camera.ortho_scale = 4.3
obj = bpy.data.objects.new('Preview camera', camera)
scene.collection.objects.link(obj)
obj.location = (4, -6, 4.3)
obj.rotation_euler = (Vector((0, 0, 1.0)) - obj.location).to_track_quat('-Z', 'Y').to_euler()
scene.camera = obj
destination = ROOT / 'art/qa' / (('curated-' if args.source else 'blender-') + args.asset + '.png')
destination.parent.mkdir(parents=True, exist_ok=True)
scene.render.filepath = str(destination)
print('Library assets:', len([c for c in bpy.data.collections if c.name.startswith('asset:')]))
print('Preview meshes:', len([o for o in objects if o.type == 'MESH']))
bpy.ops.render.render(write_still=True)
print('Preview:', destination)
