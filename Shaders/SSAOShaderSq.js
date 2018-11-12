var SSAOShader = 
{
    defines :
    {
        'Depth_Texture':1
    },
    uniforms:
    {
        'tDepth': { type: 't', value: null },
        'albedo' : {type: 't', value: null },
        'resolution': {type : 'v', value : null}
    },
    vertexShader: [

		"varying vec2 vUv;",
		"void main() {",

			"gl_Position =  vec4( position, 1.0 );",
            "vUv = (gl_Position.xy+vec2(1.0))/2.0;",
		"}"

    ].join( "\n" ),
    fragmentShader:
    [
        "uniform sampler2D tDepth;",
        "uniform sampler2D albedo;",
        "uniform vec2 resolution;",
        "varying vec2 vUv;",
        "vec4 getDepth(in vec2 v)",

        "{return texture2D(tDepth,v);}",

        "vec4 getAlbedo(in vec2 v)",

        "{return texture2D(albedo,v);}",


        "void main() {",
        "vec2 texel = vec2( 1.0 / resolution.x, 1.0 / resolution.y );",
        /*"vec2 samples[8] = {vec2(-1,-1),vec2(-1,0),vec2(-1,1),vec2(0,-1),vec2(0,1),vec2(1,-1),vec2(1,0),vec2(1,1)};",*/
        "vec2 samples[24];",
        "samples[0] = vec2(-1,-1);",
        "samples[1] = vec2(-1,0);",
        "samples[2] = vec2(-1,1);",
        "samples[3] = vec2(0,-1);",
        "samples[4] = vec2(0,1);",
        "samples[5] = vec2(1,-1);",
        "samples[6] = vec2(1,0);",
        "samples[7] = vec2(1,1);",
        "samples[8] = vec2(-2,-2);",
        "samples[9] = vec2(-2,-1);",
        "samples[10] = vec2(-2,0);",
        "samples[11] = vec2(-2,1);",
        "samples[12] = vec2(-2,2);",
        "samples[13] = vec2(-1,-2);",
        "samples[14] = vec2(-1,2);",
        "samples[15] = vec2(0,-2);",
        "samples[16] = vec2(0,2);",
        "samples[17] = vec2(1,-2);",
        "samples[18] = vec2(1,2);",
        "samples[19] = vec2(2,-2);",
        "samples[20] = vec2(2,-1);",
        "samples[21] = vec2(2,0);",
        "samples[22] = vec2(2,1);",
        "samples[23] = vec2(2,2);",
        "float occlusion = 0.0;",
        "for(int i = 0; i < 24; i++){",
        "if (texture2D(tDepth,vUv+samples[i]*texel).r>texture2D(tDepth,vUv).r){",
        "occlusion+=1.0;}}",
        "float ambient_occlusion = 1.0-occlusion/24.0;",
        "gl_FragColor =vec4(ambient_occlusion,ambient_occlusion,ambient_occlusion,1.0);",
        "}"
    ].join("\n")
};