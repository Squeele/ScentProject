
function CreateClovers(size,bottom,left,diff_x,diff_y,first,mult) 
{
    //var colors = [0xfff000,0xfffd00,0xab023,0x00dcf5,0xc15216]
    while (meshes.children.length)
    {
        meshes.remove(meshes.children[0]);
        
    }
    while (outlines.children.length)
    {
        outlines.remove(outlines.children[0]);
    }
    for (let i = 0; i < linked.length; i++) 
    {
        var poslat = -(size/2)+size*((elements[linked[i][0]].lat - bottom)/diff_y);
        var poslon = -(size/2)+size*((elements[linked[i][0]].lon - left)/diff_x);
        var count_pi = 0;
        var count = 0;
        var step = (linked[i].length)/2;
        var current_clovers = new THREE.Group();
        var current_values = new THREE.Group();
        while (count_pi < 2*Math.PI)
        {
            var geometry = new THREE.BoxBufferGeometry(elements[linked[i][count]].weight,elements[linked[i][count]].weight,elements[linked[i][count]].custom[mult]+Math.random()*0.09);
            var material = new THREE.MeshPhongMaterial({color:GetColor(linked[i][count]) });
            var outline_mat = new THREE.MeshBasicMaterial({color : 0x000000, side: THREE.BackSide});
            var outline = new THREE.Mesh(geometry, outline_mat);
            outline.scale.multiplyScalar(1.05);
            
            var box_mesh = new THREE.Mesh(geometry,material);
            box_mesh.name = "" + linked[i][count];
            if (step * 2 == 2)
            {
                box_mesh.position.set(poslon,poslat,(elements[linked[i][count]].custom[mult]*0.5)+0.3);
                outline.position.set(poslon,poslat,(elements[linked[i][count]].custom[mult]*0.5)+0.3);
            }
            else
            {
                box_mesh.position.set(poslon+Math.cos(count_pi)*0.5*1.5*step*2,poslat+Math.sin(count_pi)*0.5*1.5*step*2,(elements[linked[i][count]].custom[mult]*0.5)+0.3);
                outline.position.set(poslon+Math.cos(count_pi)*0.5*1.5*step*2,poslat+Math.sin(count_pi)*0.5*1.5*step*2,(elements[linked[i][count]].custom[mult]*0.5)+0.3);
            }
            if (first == true)
            {
                if(step * 2 == 2)
                {
                    current_values.add(CreatePolygon(elements[linked[i][count]].custom.length,poslon,poslat,elements[linked[i][count]].custom[mult]+0.3,linked[i][count]));
                }
                else
                {
                    current_values.add(CreatePolygon(elements[linked[i][count]].custom.length,poslon+Math.cos(count_pi)*0.5*1.5*step*2,poslat+Math.sin(count_pi)*0.5*1.5*step*2,elements[linked[i][count]].custom[mult]+0.3,linked[i][count]));
                }    
            }
            var rand =Math.random()*2*Math.PI;
            box_mesh.rotation.z = rand;
            outline.rotation.z = rand;
            outlines.add(outline);
            current_clovers.add(box_mesh);
            count_pi += (Math.PI)/step;
            count += 1;
        }
        values.add(current_values);
        meshes.add(current_clovers);
    }
    console.log(meshes);
}
