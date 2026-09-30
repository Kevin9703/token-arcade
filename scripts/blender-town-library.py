"""Optional artist workflow: import the original GLBs into an editable Blender library.

blender --background --python scripts/blender-town-library.py
blender --background --python scripts/blender-town-library.py -- --export art/token-town-library.blend
Blender is optional; npm run build:assets uses the checked-in TypeScript prefabs.
"""
import argparse
import sys
from pathlib import Path
import bpy
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--export', type=Path)
parser.add_argument('--output-dir', type=Path, help='Export destination; defaults to the game asset directory')
parser.add_argument('--asset', help='Export just one asset stem, useful for previewing a round trip')
parser.add_argument('--rebuild', action='store_true', help='Regenerate an existing library from the game GLBs')
args = parser.parse_args(sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else [])
assets = ROOT / 'public/assets/town/models'

if args.export:
    bpy.ops.wm.open_mainfile(filepath=str(args.export.resolve()))
    if args.asset and bpy.data.collections.get('asset:' + args.asset) is None:
        raise ValueError('Unknown asset: ' + args.asset)
    destination = (args.output_dir or assets).resolve()
    destination.mkdir(parents=True, exist_ok=True)
    for collection in list(bpy.data.collections):
        if not collection.name.startswith('asset:'):
            continue
        if args.asset and collection.name != 'asset:' + args.asset:
            continue
        objects = list(collection.all_objects)
        roots = [obj for obj in objects if obj.parent not in objects]
        offset = collection['library_offset']
        bpy.ops.object.select_all(action='DESELECT')
        for obj in objects:
            obj.hide_set(False)
            obj.select_set(True)
        for obj in roots:
            obj.location.x -= offset[0]
            obj.location.y -= offset[1]
        try:
            bpy.ops.export_scene.gltf(filepath=str(destination / collection['filename']), export_format='GLB', use_selection=True, export_yup=True)
        finally:
            for obj in roots:
                obj.location.x += offset[0]
                obj.location.y += offset[1]
else:
    destination = ROOT / 'art/token-town-library.blend'
    if destination.exists() and not args.rebuild:
        parser.error('Library already exists. Use --rebuild only when intentionally replacing it from the game GLBs.')
    bpy.ops.wm.read_factory_settings(use_empty=True)
    for index, path in enumerate(sorted(assets.glob('*.glb'))):
        before = set(bpy.data.objects)
        bpy.ops.import_scene.gltf(filepath=str(path))
        objects = list(set(bpy.data.objects) - before)
        collection = bpy.data.collections.new('asset:' + path.stem)
        bpy.context.scene.collection.children.link(collection)
        offset = ((index % 9) * 5, (index // 9) * 5)
        collection['filename'] = path.name
        collection['library_offset'] = offset
        for obj in objects:
            for owner in list(obj.users_collection):
                owner.objects.unlink(obj)
            collection.objects.link(obj)
            if obj.parent not in objects:
                obj.location.x += offset[0]
                obj.location.y += offset[1]
    for area in bpy.context.screen.areas:
        if area.type == 'VIEW_3D':
            area.spaces.active.shading.type = 'MATERIAL'
            offset = bpy.data.collections['asset:house-0']['library_offset']
            view = area.spaces.active.region_3d
            view.view_location = Vector((offset[0], offset[1], 1))
            view.view_distance = 4.8
            view.view_rotation = Vector((4, -6, 4.3)).to_track_quat('Z', 'Y')
            view.view_perspective = 'ORTHO'
    bpy.ops.object.select_all(action='DESELECT')
    destination.parent.mkdir(exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=str(destination))
    print('Editable town library:', destination)
