function RaycastHandler()
{
    raycaster.setFromCamera(mouse,camera);
    var intersection = raycaster.intersectObjects(meshes.children,true);
    if ( intersection.length > 0 )
    {
        var index = parseInt(intersection[0].object.name);
        var doc = document.getElementById("info");
        doc.textContent = elements[index].type + " : " + elements[index].subtype;
    }
    else
    {
        var doc = document.getElementById("info");
        doc.textContent = "";
    }
}