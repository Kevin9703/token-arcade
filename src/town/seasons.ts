import * as T from 'three';
import type { Season } from './world-time';
// Shared shader uniforms change the landscape without rebuilding its geometry.
export class SeasonPalette {
  private uniforms={ spring:{value:0}, autumn:{value:0}, winter:{value:0} };
  private installed=new WeakSet<T.Material>();
  install(root:T.Object3D,role?:string):void {
    root.traverse(o=>{if(!(o instanceof T.Mesh))return;for(const m of Array.isArray(o.material)?o.material:[o.material]){
      if(!(m instanceof T.MeshStandardMaterial)||this.installed.has(m))continue;
      const kind=m.userData.seasonRole||role;if(!kind)continue;this.installed.add(m);
      m.onBeforeCompile=shader=>{shader.uniforms.townSpring=this.uniforms.spring;shader.uniforms.townAutumn=this.uniforms.autumn;shader.uniforms.townWinter=this.uniforms.winter;
        shader.fragmentShader='uniform float townSpring; uniform float townAutumn; uniform float townWinter;\n'+shader.fragmentShader;
        const green=kind==='grove'?'step(diffuseColor.r*1.12,diffuseColor.g)*step(diffuseColor.b*.95,diffuseColor.g)':'1.0';
        const edit=kind==='roof'?'diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.78,.85,.88),townWinter*.90);':`float leaf=${green}; diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.46,.63,.32),townSpring*leaf*.25); diffuseColor.rgb=mix(diffuseColor.rgb,vec3(${kind==='ground'?'.48,.40,.20':'.64,.28,.075'}),townAutumn*leaf*.75); diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.76,.83,.86),townWinter*leaf*.94);`;
        shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\n'+edit);
      };m.customProgramCacheKey=()=>`town-season-${kind}`;m.needsUpdate=true;
    }});
  }
  update(season:Season,dt:number):void {for(const name of ['spring','autumn','winter']as const)this.uniforms[name].value+=(Number(season===name)-this.uniforms[name].value)*(1-Math.exp(-dt*1.8));}
  get snow():number{return this.uniforms.winter.value;}
}
