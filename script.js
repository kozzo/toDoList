let liste = document.querySelector("#maListe")
loadList()

class typeClic{
    //C'est une classe parce que j'ai pompé un cours...
    handleEvent(event){
        if(event.type == "dblclick") 
        {
            if(event.target.classList.contains("toDelete"))
            {
                event.target.classList.remove("toDelete")
            }
            else
            {
                event.target.classList.add("toDelete")
            }
        }
    }
}

let li = liste.querySelectorAll("li")

let toDoInfo = {
    "text": String,
    "completed": Boolean
}

for(let row of li)
{
    let clic = new typeClic()
    row.addEventListener("dblclick", clic)
}



//ON APPUIE SUR ENTRÉE

let inputText = document.querySelector("#toAdd")

inputText.addEventListener("keypress", function(event) {
    console.log(event.key)
    if(event.key == "Enter") 
        {
            document.querySelector("#button1").click()

        }
})

//J'aimerai bien qu'on puisse entrer une nouvelle liste en appuyant sur entrée
//pas seulement en cliquant sur le bouton
//console.log(event.key)

//AJOUTE UN ÉLÉMENT A LA LISTE
function addItem()
{
    let newToDo = document.querySelector("#toAdd")
    let newli = document.createElement("li")
    
    newli.innerHTML = newToDo.value
    newli.classList.add("toDo")

    let clic = new typeClic()
    newli.addEventListener("dblclick", clic)
    liste.append(newli)
    newToDo.value = ""
}

//SUPPRIME TOUTE LA LISTE
function removeItems()
{
    let li = liste.querySelectorAll("li")
    for(let row of li)
    {
        row.remove();
    }
}

//SUPPRIME LES ÉLÉMENTS BARRÉS
function removeCrossedItems()
{
    let li = liste.querySelectorAll("li")
    for(let row of li)
    {
        if(row.matches(".toDelete")) row.remove()
    }
}

//SAUVEGARDE
function saveList()
{
    let liste = document.querySelector("#maListe")
    let li = liste.querySelectorAll("li")
    var toDos = []


    let i=0
    for(let row of li)
    {
        let toDoInfo = {
            "text": row.innerText,
            "completed": row.matches(".toDelete")
        }
        toDos[i] = toDoInfo
        i++
    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
}

//RÉCUPÉRER LA SAUVEGARDE
function loadList()
{
    let toDos = JSON.parse(localStorage.getItem("toDos"))
    if(toDos == null) return
    
    for(let i=0; i<toDos.length; i++)
    {
        let newli = document.createElement("li")
    
        newli.innerHTML = toDos[i].text

        newli.classList.add("toDo")
        if(toDos[i].completed) newli.classList.add("toDelete")

        liste.append(newli)

        //Je comprends rien à JSON mais ça marche \o/
    }
}
