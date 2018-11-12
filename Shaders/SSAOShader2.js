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
        'noise' : {type: 'v3v', value: null },
        'aspect_ratio' : {type: 'f',value:null},
        'fov_half_tan' : {type: 'f',value:null},
        'proj_matrix' : {type :'m4', value: null}
    },
    vertexShader: [

		"varying vec2 vUv;",
        "varying vec2 viewRay;",
        "uniform float aspect_ratio;",
        "uniform float fov_half_tan;",
		"void main() {",

			"gl_Position =  vec4( position, 1.0 );",
            "vUv = (gl_Position.xy+vec2(1.0))/2.0;",
            "viewRay.x = gl_Position.x*aspect_ratio*fov_half_tan;",
            "viewRay.y = gl_Position.y*fov_half_tan;",
		"}"

    ].join( "\n" ),
    fragmentShader:
    [
        "#include <packing>",
        "uniform sampler2D tDepth;",
        "uniform sampler2D albedo;",
        "uniform mat4 proj_matrix;",
        "uniform vec3 noise[16];",
        "varying vec2 vUv;",
        "varying vec2 viewRay;",
        "vec4 getDepth(in vec2 v)",

        "{return texture2D(tDepth,v);}",

        "vec4 getAlbedo(in vec2 v)",

        "{return texture2D(albedo,v);}",

        "float getZView(in vec2 coords){",
        "float depth = getDepth(coords).x;",
        "float ZView = proj_matrix[3][2]/(2.0*depth-1.0-proj_matrix[2][2]);",
        "return ZView;}",


        "void main() {",
        "float ZView = getZView(vUv);",
        "float XView = viewRay.x*ZView;",
        "float YView = viewRay.y*ZView;",
        "vec3 position = vec3(XView,YView,ZView);",
        "float occlusion = 0.0;",
        "for(int i = 0; i < 64; i++){",
        "vec3 sample = position+noise[i];",
        "vec4 off = vec4(sample,1.0);",
        "off = proj_matrix*off;",
        "off.xy/=off.w;",
        "off.xy = off.xy*0.5+vec2(0.5);",
        "float sampleDepth =  getZView(off.xy);",
        "if (position.z<sampleDepth){ occlusion+=1.0;}",
        "}",
        "float ambient_occlusion = 1.0-occlusion/64.0;",
        "gl_FragColor =vec4(ambient_occlusion,ambient_occlusion,ambient_occlusion,1.0);",
        "}"
    ].join("\n")
};