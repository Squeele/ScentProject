//Useless class: used offscreen rendering to create gradients (better and simpler version in MakeGradient.js)
var GradientMaker = class
{
    constructor(_color1,_color2)
    {
        this.begin = _color1;
        this.end = _color2;
        this.size = 10;
        this.sizeX = 1024;
        this.sizeY = 1024;
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera( 0, 200, 0, 100, 0, 1000 );
        this.camera.updateProjectionMatrix();
        this.camera.position.z= 5;

        this.scene.add( this.camera );
    }

    MakeGradient()
    {

        var tmp_geometry = new THREE.Geometry();
            var positions = [];
            var colors = [];

            for (let i = -5; i < 5; i++)
            {
                tmp_geometry.vertices.push(new THREE.Vector3(i*100,500,0));
                tmp_geometry.vertices.push(new THREE.Vector3(i*100,-500,0));
                tmp_geometry.colors.push(new THREE.Color(((i+5)/10)*this.end.r+(1-((i+5)/10))*this.begin.r,((i+5)/10)*this.end.g+(1-((i+5)/10))*this.begin.g,((i+5)/10)*this.end.b+(1-((i+5)/10))*this.begin.b));
                tmp_geometry.colors.push(new THREE.Color(((i+5)/10)*this.end.r+(1-((i+5)/10))*this.begin.r,((i+5)/10)*this.end.g+(1-((i+5)/10))*this.begin.g,((i+5)/10)*this.end.b+(1-((i+5)/10))*this.begin.b));
            }
            tmp_geometry.faces.push(new THREE.Face3(0,1,2));
            tmp_geometry.faces[0].color = new THREE.Color(0,0,0);
            tmp_geometry.faces[0].color.r = (tmp_geometry.colors[0].r);
            tmp_geometry.faces[0].color.g = (tmp_geometry.colors[0].g);
            tmp_geometry.faces[0].color.b = (tmp_geometry.colors[0].b);
            var d = 1;
            for (let i = 3; i < 18;) 
            {
                tmp_geometry.faces.push(new THREE.Face3(i-2,i-1,i));
                tmp_geometry.faces[d].color = tmp_geometry.colors[i-2];
                d+=1;
                tmp_geometry.faces.push(new THREE.Face3(i-1,i,i+1));
                tmp_geometry.faces[d].color = tmp_geometry.colors[i-1];
                d+=1;
                i+=2;
            }
            tmp_geometry.faces.push(new THREE.Face3(17,18,19));
            tmp_geometry.faces[17].color = (tmp_geometry.colors[17]);
            this.geometry = new THREE.BufferGeometry().fromGeometry(tmp_geometry);
            this.material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide,vertexColors:THREE.FaceColors });
            
            this.mesh = new THREE.Mesh(this.geometry , this.material );
            
            this.scene.add( this.mesh );
        var options = {
                        minFilter: THREE.NearestFilter,
                        magFilter: THREE.NearestFilter,
                        format: THREE.RGBAFormat,
                        stencilBuffer: false,
            //   			type: ( /(iPad|iPhone|iPod)/g.test( navigator.userAgent ) ) ? THREE.HalfFloatType : THREE.FloatType,
                           type: THREE.HalfFloatType,
                    };
        this.rtt = new THREE.WebGLRenderTarget( 1920, 1920, options);
    }

    MakeGradient_CSS()
    {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');


        var grd=ctx.createLinearGradient(0,0,200,0);
        grd.addColorStop(0.1,"black");
        grd.addColorStop(0.9,"white");
        
        ctx.fillStyle=grd;
        ctx.fillRect(20,20,600,100);


        ctx.fillStyle = grd;
        ctx.fill();
        this.text= new THREE.Texture(canvas);
        console.log(this.text);
    }
}