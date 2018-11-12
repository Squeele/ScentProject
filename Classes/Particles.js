

//WIP: representing smells as groups of particles
function ProtonsInClovers(size,bottom,left,diff_x,diff_y,mult) 
{
    
    for (let i = 0; i < linked.length; i++) 
    {
        var poslat = -(size/2)+size*((elements[linked[i][0]].lat - bottom)/diff_y);
        var poslon = -(size/2)+size*((elements[linked[i][0]].lon - left)/diff_x);
        var count_pi = 0;
        var count = 0;
        var step = (linked[i].length)/2;
        var current_systems = new THREE.Group();
        while (count_pi < 2*Math.PI)
        {

           var particleSystem = new THREE.GPUParticleSystem( {maxParticles: 1000} );
           particleSystem.name = "" + linked[i][count];
            if (step * 2 == 2)
            {
                particleSystem.position.set(poslon,poslat,(elements[linked[i][count]].custom[mult]*0.5)+0.3);
                
                current_systems.add(particleSystem);
            }
            else
            {
                particleSystem.position.set(poslon+Math.cos(count_pi)*0.5*1.5*step*2,poslat+Math.sin(count_pi)*0.5*1.5*step*2,(elements[linked[i][count]].custom[mult]*0.5)+0.3);
                current_systems.add(particleSystem);
            }
            count_pi += (Math.PI)/step;
            count += 1;
        }
        meshes.add(current_systems);
    }
    
    
    console.log(meshes);
}

function animateParticles()
{
    var options = {
        position: new THREE.Vector3(),
        positionRandomness: .3,
        velocity: new THREE.Vector3(),
        velocityRandomness: .5,
        color: 0xaa88ff,
        colorRandomness: .2,
        turbulence: .5,
        lifetime: 2,
        size: 5,
        sizeRandomness: 1
    };

    for (let i = 0; i < meshes.children.length; i++) 
    {
        for (let j = 0; j < meshes.children[i].children.length; j++) 
        {    
            //console.log(meshes.children[i].children[j]);
            options.position = meshes.children[i].children[j].position;
            for ( var x = 0; x < 1000; x++ ) {
                // Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
                // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
                meshes.children[i].children[j].spawnParticle( options );
            }
        }
    }
}
