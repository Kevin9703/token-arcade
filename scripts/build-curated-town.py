"""Compose CC0 Kenney modules into footprint-safe town prefabs. Run with Blender.
The checked-in derived GLBs ship directly; npm builds need no Blender or network.
Source meshes/license/provenance remain under art/vendor/kenney-fantasy-town.
"""
import bpy, math, pathlib
from mathutils import Matrix

ROOT = pathlib.Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'art/vendor/kenney-fantasy-town'
OUT = ROOT / 'public/assets/town/curated'
OUT.mkdir(parents=True, exist_ok=True)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
templates = {}
active_variant = 0
shared = bpy.data.materials.new('Kenney palette · vertex color')
shared.use_nodes = True
bsdf = next(n for n in shared.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
bsdf.inputs['Roughness'].default_value = .82
vertex = shared.node_tree.nodes.new('ShaderNodeVertexColor')
vertex.layer_name = 'Color'
shared.node_tree.links.new(vertex.outputs['Color'], bsdf.inputs['Base Color'])

def linear(c):
    return c / 12.92 if c <= .04045 else ((c + .055) / 1.055) ** 2.4

def load(name):
    if name in templates:
        return templates[name]
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=str(SOURCE / (name + '.glb')))
    objects = list(set(bpy.data.objects) - before)
    transforms = {obj: obj.matrix_world.copy() for obj in objects}
    meshes = []
    for obj in objects:
        if obj.type != 'MESH':
            continue
        obj.data.transform(transforms[obj])
        obj.parent = None
        obj.matrix_world = Matrix.Identity(4)
        uv = obj.data.uv_layers.active
        colors = obj.data.color_attributes.new(name='Color', type='FLOAT_COLOR', domain='CORNER')
        image = next((node.image for mat in obj.data.materials if mat and mat.use_nodes for node in mat.node_tree.nodes if node.type == 'TEX_IMAGE' and node.image), None)
        if image and uv:
            pixels = list(image.pixels); w, h = image.size
            for i, loop in enumerate(obj.data.loops):
                u, v = uv.data[i].uv
                idx = (min(h - 1, max(0, int(v * h))) * w + min(w - 1, max(0, int(u * w)))) * 4
                rgb = pixels[idx:idx+3]
                # A softer shared palette keeps downloaded pieces in the river-valley direction.
                gray = sum(rgb) / 3
                rgb = [gray + (c - gray) * .68 for c in rgb]
                colors.data[i].color = tuple(linear(c) for c in rgb) + (1,)
        else:
            for c in colors.data: c.color = (.14, .34, .35, .8)
        obj.data.materials.clear(); obj.data.materials.append(shared)
        for polygon in obj.data.polygons: polygon.material_index = 0
        obj.hide_render = True; obj.hide_set(True)
        meshes.append(obj)
    templates[name] = meshes
    for obj in objects:
        if obj.type != 'MESH': bpy.data.objects.remove(obj, do_unlink=True)
    return meshes

def put(collection, name, x=0, y=0, z=0, ry=0, scale=(1,1,1)):
    if isinstance(scale, (int,float)): scale = (scale,scale,scale)
    for template in load(name):
        obj = template.copy(); obj.data = template.data.copy()
        if name.startswith('roof') or name.startswith('tree'):
            palettes = ['#a85f49','#5e8175','#637f91','#ae9155'] if name.startswith('roof') else ['#66835b','#82986a','#536f64','#aa9159']
            tint = tuple(linear(int(palettes[active_variant][i:i+2],16)/255) for i in (1,3,5))
            for value in obj.data.color_attributes['Color'].data:
                r,g,b,a = value.color
                if g > r*1.16 and g > b*.85:
                    value.color = tuple(c * (.82 + min(g,.4)) for c in tint) + (a,)
        collection.objects.link(obj)
        obj.hide_render = False; obj.hide_set(False)
        obj.location = (x, -z, y)
        obj.rotation_euler = (0,0,ry)
        obj.scale = (scale[0],scale[2],scale[1])

def cube(collection, name, location, scale, color):
    bpy.ops.mesh.primitive_cube_add(size=1)
    obj = bpy.context.object; obj.name = name
    for c in list(obj.users_collection): c.objects.unlink(obj)
    collection.objects.link(obj)
    obj.location = (location[0], -location[2], location[1]); obj.scale = (scale[0],scale[2],scale[1])
    mat = bpy.data.materials.get(color)
    if not mat:
        mat = bpy.data.materials.new(color); mat.diffuse_color = tuple(linear(int(color[i:i+2],16)/255) for i in (1,3,5)) + (1,); mat.use_nodes = True
        node = next(n for n in mat.node_tree.nodes if n.type == 'BSDF_PRINCIPLED'); node.inputs['Base Color'].default_value = mat.diffuse_color; node.inputs['Roughness'].default_value = .9
    obj.data.materials.append(mat)
    bevel = obj.modifiers.new('Soft miniature edge','BEVEL'); bevel.width = .025; bevel.segments = 2

def export(collection, name, scale=1):
    bpy.ops.object.select_all(action='DESELECT')
    for obj in collection.objects:
        obj.location *= scale; obj.scale *= scale; obj.select_set(True)
    bpy.ops.export_scene.gltf(filepath=str(OUT / (name+'.glb')), export_format='GLB', use_selection=True, export_apply=True, export_yup=True)
    for obj in list(collection.objects): bpy.data.objects.remove(obj,do_unlink=True)
    bpy.data.collections.remove(collection)

def collection(name):
    c = bpy.data.collections.new(name); bpy.context.scene.collection.children.link(c); return c

for name, source, scale in [('cart','cart',.6),('hedge','hedge',.9),('fountain','fountain-round',.83),('pine','tree-high',.75),('birch','tree-high-round',.65),('rock','rock-small',.4),('boulder','rock-wide',.6),('stall','stall-green',.62)]:
    active_variant = 0
    c=collection(name); put(c,source,scale=scale)
    if name=='fountain': put(c,'fountain-center',0,.05,0,scale=.72)
    export(c,name)

for variant in range(4):
    active_variant = variant
    c=collection('tree'); put(c,'tree' if variant%2==0 else 'tree-crooked',scale=.72); export(c,'tree-'+str(variant))
    c=collection('park'); cube(c,'garden base',(0,.025,0),(1.96,.05,1.96),'#91a47b')
    put(c,'fountain-round',-.24,.025,-.18,scale=.45); put(c,'fountain-center',-.24,.09,-.18,scale=.35)
    put(c,'tree-high-round',.61,.04,-.61,scale=.37); put(c,'stall-bench',.46,.06,.56,scale=.55)
    put(c,'hedge',-.45,.04,-.87,scale=(.52,.38,.45)); export(c,'park-'+str(variant))

c=collection('market'); cube(c,'market court',(0,.03,0),(2.8,.06,2.8),'#b9b2a1')
for x,z in [(-.75,-.6),(.75,-.6),(0,.55)]: put(c,'stall-red' if x<0 else 'stall-green',x,.05,z,scale=(.64,.8,.58))
put(c,'cart',1.1,.08,.67,scale=.4); export(c,'market')

# Preserve a fresh editable library separately from the user's original Blender file.
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT / 'art/kenney-modules.blend'))
print('Curated Kenney town prefabs exported.')
