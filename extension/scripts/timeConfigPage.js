function timeConfigPage(){
    let timeConfigPage =  document.createElement('div')
    timeConfigPage.id = "configPage"
    timeConfigPage.innerHTML = 
    `
        <form>
            <div id="formInput">
                <label for="SprintSize">Sprint Size</label>
                <input type="number" name="SprintSize" id="SprintSize" min="1" max="10">
            </div>
            <div id="formBtns">
                <button type="submit" id="btnOk">send</button>
                <button type="button" id="btnCancel">cancel</buton>
            </div>
        </form>
    `
    return timeConfigPage
}



function openSprintPopUp(){
    document.getElementById("btnOpenConfigPage").addEventListener('click', function(){
        document.getElementById("configPage").style.display="block"
    })
}

function btnCancel(){
    document.getElementById("btnCancel").addEventListener('click', function(){
        document.getElementById("configPage").style.display="none"
    })
    
}


function settingsOnClick()
{
    let button = document.getElementById("settingsButton")
    if (button !== undefined && button !== null)
    {
        let saveButton = document.getElementById("settingsSave")
        if (saveButton !== undefined && saveButton !== null)
        {
            saveButton.addEventListener('click', function()
            {
                let input = document.getElementById('sprintLength').value
                alert(input) // TODO: colocar este dado dentro de uma variável acessível pelas metric pages
                $('#settingsModal').modal('toggle');
            })
        }
    }
}

// event listener to listen to the time configuration
function timeConfigOnClick(){
    try{
        let button = document.getElementById("btnOk")
        if (button !== undefined){
        button.addEventListener('click', function(){
            let input = document.getElementById("SprintSize")
            if (input !== undefined)
            test(input.value) // so pra testar se o clique ta funfando
        })
        }
    }catch (err){
        console.log("GBD error:", err)
    }
}