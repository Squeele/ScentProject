var CustomSSAO = class
{
    constructor()
    {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-1,1,1,-1,0,1);
        this.geometry = new THREE.PlaneBufferGeometry(2,2);
        /*this.random_noise = this.Generate_Noise(8,8);*/
        this.material = new THREE.ShaderMaterial( {

			defines: SSAOShader.defines,
			uniforms: SSAOShader.uniforms,
			vertexShader: SSAOShader.vertexShader,
			fragmentShader: SSAOShader.fragmentShader

    } );
    /*this.material = new THREE.ShaderMaterial( {

        defines: THREE.SobelOperatorShader.defines,
        uniforms: THREE.SobelOperatorShader.uniforms,
        vertexShader: THREE.SobelOperatorShader.vertexShader,
        fragmentShader: THREE.SobelOperatorShader.fragmentShader

    } );*/
    this.material.uniforms[ 'albedo' ].value = AlbedoTarget.texture;
    this.material.uniforms[ 'resolution' ].value = new THREE.Vector2(1920,1080);
    this.material.uniforms['tDepth'].value = DepthTarget.texture;
    this.mesh = new THREE.Mesh(this.geometry,this.material);
    this.scene.add(this.mesh);
    }

    Generate_Noise_Texture(width,height)
    {
        var size = width*height;
        var data = new Uint8Array( 3 * size );
        for(let i = 0;i<size;i++)
        {
            var index = i*3; 
            data[index] = Math.floor(Math.random()*255);
            data[index+1] = Math.floor(Math.random()*255);
            data[index+2] = 0.0;
        }
        var texture = new THREE.DataTexture( data, width, height, THREE.RGBFormat );
        texture.needsUpdate= true;
        return texture;
    }
    Generate_Noise(width,height)
    {
        var size = width*height;
        var data = [];
        for(let i = 0;i<size;i++)
        {
            data.push(new THREE.Vector3((Math.random()-0.5)*2,(Math.random()-0.5)*2,0));
        }
        return data;
    }
    Render()
    {
        renderer.render(this.scene,this.camera);
    }
}