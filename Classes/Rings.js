function Create_Meshes(bottom,top,right,left,diff_x,diff_y,size,mult,dist)
{

    while (meshes.children.length)
    {
        meshes.remove(meshes.children[0]);
    }

    var positions_group = new THREE.Group();
    for (let i = 0; i < linked.length; i++) 
    {
        for (let j = 0; j < linked[i].length; j++) 
        {
            if(elements[linked[i][j]].lat <= top && elements[linked[i][j]].lat >= bottom && elements[linked[i][j]].lon <= right && elements[linked[i][j]].lon >= left)
            {
                positions_group.add(CreateRing([linked[i][j]],size,bottom,left,diff_x,diff_y,j,mult,dist) );
            }
        }
    }
    positions_group.name = "meshes";
    meshes.add(positions_group);
}

function CreateRing(i,size,bottom,left,diff_x,diff_y,height,d,dist) 
{
    var colors_array = [0xffffff, 0x000000, 0x000000];
    var poslat = -(size/2)+size*((elements[i].lat - bottom)/diff_y);
    var poslon = -(size/2)+size*((elements[i].lon - left)/diff_x);
    var geom = new THREE.RingBufferGeometry(dist*elements[i].custom[d],dist*elements[i].custom[d]+dist*elements[i].weight,32,1,0,6);
    var material = new THREE.MeshBasicMaterial( {color: GetColor(i), side: THREE.DoubleSide,opacity: 1-0.15*(height+1),transparent : true} );
    var ring = new THREE.Mesh( geom, material );
    ring.position.set(poslon,poslat,3.5+ 1*(height)+Math.random()*0.01);
    ring.name = "" + i;
    return ring;
}

function ShowCustom(size,bottom,left,diff_x,diff_y)
{
    var customs = new THREE.Group();
    var hex = [0xff0000,0x00ff00,0x0000ff];
    for (let i = 0; i < linked.length; i++) 
    {
        for (let j = 0; j< linked[i].length; j++) 
        {
            var t = linked[i][j];
            var originlat = -(size/2)+size*((elements[t].lat - bottom)/diff_y);
            var originlon = -(size/2)+size*((elements[t].lon - left)/diff_x);
            customs.add(CreatePolygon(elements[t].custom.length,originlon,originlat,j,t));
        }
    }
    scene.add(edges_group);
    values.add(customs);
}