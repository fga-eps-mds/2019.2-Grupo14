let url_base = 'http://18.215.242.203:3000'

const gbdScreen = () => 
{
    let issueResp , prResp, branchResp, commitResp
    
    let gbdtab = document.getElementById('gbdButton')
    let current_selected = document.getElementsByClassName('js-selected-navigation-item selected reponav-item')
    let zenhub_selected = document.getElementsByClassName('reponav-item zh-sidebar-item zh-navbar-link zh-topbar-item selected')
    
    gbdtab.classList.remove('gbdselected')

    if (zenhub_selected[0] !== undefined)
        zenhub_selected[0].classList.remove('selected')

    if (current_selected[0] !== undefined)
        current_selected[0].classList.remove('selected')

    gbdtab.className = 'js-selected-navigation-item gbdselected reponav-item'

    const addCss = () => 
    {
        let innerStyle = 
        `   
            
          #gbdScreen {
            position: relative;
            border-radius : 25px;
            box-shadow: 5px 5px #e1e4e8; 
            border-top : 0;
            border-bottom : 3px #e36209 #e1e4e8 transparent;
            border-right : 3px #e36209 #e1e4e8 transparent;
            width : 100%;
            height : 500px;
            left:0;
            
          }
          
          #gbdSidebar {
            font: inherit;
            border-radius : 25px;
            position: absolute;
            display: block;
            text-decoration: none;
            width : 5%;
            height : 100%;
            background-color:rgba(0,51,102,0.63);
            -webkit-transition :all 0.5s;
            transition : all 0.5s;
          }
          
          #gbdSidebar:hover{
            width : 20%;
          }
          
          #gbdSidebar a{
            font-weight: 500;
            font-size : 13px;
            text-decoration : none;
            display : block;
            list-style-type : none;
            color : rgba(230, 230, 230);
            text-align : center;
            margin: 40px;
            overflow:hidden;
            transition: all 0.3s;
            -webkit-transition: all 0.3s;
            -moz-transition: all 0.3s;
          }

          #gbdSidebar p{
            text-align : center;
            font-size: inherit;
            font-weight: 700;
            color : rgba(230, 230, 230);
            overflow: hidden;
            margin : 45px;
            border-bottom: 1px solid rgba(255, 137, 75, 0.42);
          }

          #gbdSidebar p:hover {
            border-bottom: 1px solid rgba(255, 137, 75, 0.42);
          }


          .reponav-item.gbdselected {
              color:#24292e;
              background-color:#fff;
              border-color:
              rgba(0,51,102,0.7) #e1e4e8 transparent;
            }

          .gbdMenu:hover{
            margin : 0px;
            color : rgba(105, 107, 108, 1);
            border-bottom : 1px solid rgba(105, 107, 108, 1);
          }

          
          .flexContainer
            {
                position: relative;
                width: 80%;
                height: 100%;
                left : 20%; 
               
            }

 
            .chartjs-render-monitor {
                position: absolute;
                border: 1px solid black;
                box-shadow: 5px 5px #e1e4e8;
                border-radius : 10px;
            }
            

            #commitsDashboard {
                top: 0;
                right: 0;
                display: block;
                width: 50% !important;
                height: 50% !important;
            }

            #issuesDashboard {
                top: 0;
                left: 0;
                display: block;
                width: 50% !important;
                height: 50% !important;
            }

            #prsDashboard {
                bottom: 0;
                right: 0;
                display: block;
                width: 50% !important;
                height: 50% !important;
            }

            #branchesDashboard {
                bottom: 0;
                left: 0;
                display: block;
                width: 50% !important;
                height: 50% !important;
            }

        `

        //The final tag
        let css = document.createElement('style')
        css.innerHTML = innerStyle

        //Inserting the tag into the head
        let head =  document.getElementsByTagName('head')
        head[0].appendChild(css)  
    }

    const addScreen = () => {
        innerScreen = 
        `    
        <div id="gbdScreen">
            <div id="gbdSidebar">
                <p>GitBreakDown</p>
                <a class="gbdMenu" href="#">Home</a>
                <a class="gbdMenu" href="#">Documentation</a>
                <a class="gbdMenu" href="#">About us</a>
            </div>
            <div class="flexContainer">
                <canvas id="commitsDashboard"></canvas>
                <canvas id="issuesDashboard"></canvas>   
                <canvas id="prsDashboard"></canvas>   
                <canvas id="branchesDashboard"></canvas>       
            </div>
        </div>
        `
        return innerScreen
    }
    
    //revoming a black space between the navbar and the breakDown screen
    let pageHead = document.getElementsByClassName("pagehead repohead instapaper_ignore readability-menu experiment-repo-nav")
    let pageElement = pageHead[0]
    pageElement.style.marginBottom = "5px"
    
    //make MainContainer use 100% of the screen size
    let mainContainer = document.getElementsByClassName('container-lg clearfix new-discussion-timeline experiment-repo-nav  px-3')
    mainContainer[0].innerHTML = addScreen()
    mainContainer[0].style.maxWidth = "100%"
   
    addCss()

    
    if (typeof chrome.app.isInstalled !== 'undefined')
    {
        console.log("gbdScreen sending requests")
        chrome.runtime.sendMessage({metric: "get-metrics"}, function(response) 
        {
                if (response !== undefined)
                {
                    let issuesCtx = document.getElementById('issuesDashboard').getContext('2d')
                    createIssuesChart(response[1], issuesCtx)
                    
                    let commitCtx = document.getElementById('commitsDashboard').getContext('2d')
                    createCommitsChart(response[0], commitCtx)

                    let branchesCtx = document.getElementById('branchesDashboard').getContext('2d')
                    createBranchesChart(response[2], branchesCtx)

                    let prCtx = document.getElementById('prsDashboard').getContext('2d')
                    createPRChart(response[3], prCtx)
                }
                else{
                    console.log("gbdScreen-else")
                    document.getElementById('gbdButton').click()
                }                   
                
        })
    }
    
}



window.onhashchange = function()
{
    let gbdButton = document.getElementById('gbdButton')
    if (gbdButton !== this.undefined)
    {
        if (window.location.href.includes("#breakdown"))
        {
            console.log("showing breakdown screen")
            gbdScreen()
        }
        else
        {
            if (gbdButton.className == 'js-selected-navigation-item gbdselected reponav-item')
            {
                console.log("removing selection from gbd button")
                gbdButton.classList.remove('gbdselected')
            }
        }
    }
}

const gbdButtonOnClick = () => 
{
    const gbdtab = document.getElementById('gbdButton')
    if (gbdtab !== null)
    {
        gbdtab.addEventListener('click', gbdScreen)
    }
}

const zenhubOnClick = () =>
{
    const zhTab = document.getElementsByClassName("reponav-item zh-sidebar-item zh-navbar-link zh-topbar-item selected")[0]
    if (zhTab !== null && zhTab !== undefined)
    {
        zhTab.addEventListener('click', function()
        {
            document.getElementById('gbdButton').classList.remove('gbdselected')
        })
    }
}

const update = () =>	
{	
    let observer = new MutationObserver( () => 	
    {   	
        zenhubOnClick()
        if(document.getElementById('gbdButton') !== null)	
        {   		
            gbdButtonOnClick()	
        }
    })	

    observer.observe(document, {	
        subtree: true,	
        childList: true	
    })	
}



gbdButtonOnClick()
update()