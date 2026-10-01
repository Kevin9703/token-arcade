import * as T from 'three';

/** Preserve complete meshes and materials, draw repeated static scenery in batches. */
export function sceneryBatch(source: T.Group, placements: T.Matrix4[]): T.Group {
  const group = new T.Group(); group.name = 'instanced-scenery'; source.updateMatrixWorld(true);
  const inverse = source.matrixWorld.clone().invert();
  source.traverse(o => {
    if(!(o instanceof T.Mesh) || o instanceof T.InstancedMesh) return;
    const local = inverse.clone().multiply(o.matrixWorld), material = Array.isArray(o.material) ? o.material.map(m=>m.clone()) : o.material.clone();
    const batch = new T.InstancedMesh(o.geometry.clone(), material, placements.length);
    placements.forEach((p,i)=>batch.setMatrixAt(i,p.clone().multiply(local)));
    batch.castShadow=o.castShadow; batch.receiveShadow=o.receiveShadow; group.add(batch);
  });
  return group;
}
