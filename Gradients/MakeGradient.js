function MakeGradient_CSS()
{
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');


    var grd=ctx.createLinearGradient(0,0,200,0);
    grd.addColorStop(0,gradient_styles[gradient][0]);
    grd.addColorStop(1,gradient_styles[gradient][1]);

    ctx.fillStyle=grd;
    ctx.fillRect(0,0,800,600);

    ctx.fillStyle = grd;
    ctx.fill();
    var text= new THREE.Texture(canvas);
    text.needsUpdate = true;
    return text;
}

function MakeRadialGradient_CSS(color)
{
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    var ctx=canvas.getContext("2d");

    var grd=ctx.createRadialGradient(75,50,5,90,60,100);
    grd.addColorStop(0,"white");
    grd.addColorStop(0.8,color);

    // Fill with gradient
    ctx.fillStyle=grd;
    ctx.fillRect(0,0,150,150);
    var text= new THREE.Texture(canvas);
    text.needsUpdate = true;
    return text;
}