//put credentials in .env
const username = //github username;
const password = //github access token;

//get html elements
let refresh = document.getElementById('refresh')
let date = document.querySelector('#date')
let title = document.querySelector('title')
let prAuthorLinks = document.querySelectorAll('.author')
let prAuthorTotal = document.querySelector('#authorTotal')
let prAssignedLinks = document.querySelectorAll('.assigned')
let prAttentionLinks = document.querySelectorAll('.attention')
let bugUnprioritizedLinks = document.querySelectorAll('.unprioritized')
let bugP0Links = document.querySelectorAll('.p0')
let bugP1Links = document.querySelectorAll('.p1')
let bugP2Links = document.querySelectorAll('.p2')

//instead of so many requests, create one request that gets all issues and create a data model that stores all the various queries

refresh.addEventListener('click', function(event) {
    console.log('button clicked')
    let today = new Date()
    let formattedDate = today.getMonth()+1+'/'+today.getDate()+'/'+today.getFullYear()
    date.innerText = formattedDate
    title.innerText = `Daily Metrics ${formattedDate}`
    

    //PR Author
    prAuthorLinks.forEach(author => {
        let user = ""
        if (author.parentElement.parentElement.firstElementChild.innerText === 'UNASSIGNED') {
            user = '+no:assignee'
        } else if (author.parentElement.parentElement.firstElementChild.innerText !== 'TOTAL') {
            user = `+author:${author.parentElement.parentElement.firstElementChild.innerText}`
        }
        
        axios.get(`https://api.github.com/search/issues?q=is:open+repo:aws/aws-cdk+repo:aws/jsii+repo:aws-samples/aws-cdk-intro-workshop+repo:aws-samples/aws-cdk-examples+repo:aws/cdk-ops+type:pr${user}`,  {
            auth: {
                username: username,
                password: password
            }
            }).then(function (response) {
                author.innerText = response.data.total_count
            })
            .catch(function (error) {
                console.log('PR Author Error:', author, error.message);
            })
            .finally(function () {
                // always executed
        });
    })

    //PR Assigned
    setTimeout(function () {
    prAssignedLinks.forEach(assigned => {
        let user = ""
        if (assigned.parentElement.parentElement.firstElementChild.innerText === 'UNASSIGNED') {
            user = '+no:assignee'
        } else if (assigned.parentElement.parentElement.firstElementChild.innerText !== 'TOTAL') {
            user = `+assignee:${assigned.parentElement.parentElement.firstElementChild.innerText}`
        }
        axios.get(`https://api.github.com/search/issues?q=is:open+repo:aws/aws-cdk+repo:aws/jsii+repo:aws-samples/aws-cdk-intro-workshop+repo:aws-samples/aws-cdk-examples+repo:aws/cdk-ops+type:pr${user}`,  {
            auth: {
                username: username,
                password: password
            }
            }).then(function (response) {
                assigned.innerText = response.data.total_count
                
            })
            .catch(function (error) {
                console.log('PR Assigned Error:', assigned, error.message);
            })
            .finally(function () {
                // always executed
        });
    })
    }, 60000)

    //PR Attention
    setTimeout(function () {
    prAttentionLinks.forEach(attention => {
        let user = ""
        if (attention.parentElement.parentElement.firstElementChild.innerText === 'UNASSIGNED') {
            user = '+no:assignee'
        } else if (attention.parentElement.parentElement.firstElementChild.innerText !== 'TOTAL') {
            user = `+assignee:${attention.parentElement.parentElement.firstElementChild.innerText}`
        }
        axios.get(`https://api.github.com/search/issues?q=is:open+repo:aws/aws-cdk+repo:aws/jsii+repo:aws-samples/aws-cdk-intro-workshop+repo:aws-samples/aws-cdk-examples+repo:aws/cdk-ops+type:pr+-label:contribution/core+-label:pr-status/work-in-progress+review:required${user}`,  {
            auth: {
                username: username,
                password: password
            }
            }).then(function (response) {
                if (response.data.total_count >= 5 && response.data.total_count < 10) {
                    attention.innerText = response.data.total_count
                    attention.parentElement.style.backgroundColor = '#f9ebb1'
                } else if (response.data.total_count >= 10) {
                    attention.innerText = response.data.total_count
                    attention.parentElement.style.backgroundColor = '#f9bab1'
                } else {
                    attention.innerText = response.data.total_count
                }
                
            })
            .catch(function (error) {
                console.log('PR attention Error:', attention, error.message);
            })
            .finally(function () {
                // always executed
        });
    })
    }, 120000)

    //Bugs Unprioritized
    setTimeout(function () {
    bugUnprioritizedLinks.forEach(unprioritized => {
        let user = ""
        if (unprioritized.parentElement.parentElement.firstElementChild.innerText === 'UNASSIGNED') {
            user = '+no:assignee'
        } else if (unprioritized.parentElement.parentElement.firstElementChild.innerText !== 'TOTAL') {
            user = `+assignee:${unprioritized.parentElement.parentElement.firstElementChild.innerText}`
        }
        axios.get(`https://api.github.com/search/issues?q=is:open+repo:aws/aws-cdk+repo:aws/jsii+repo:aws-samples/aws-cdk-intro-workshop+repo:aws-samples/aws-cdk-examples+repo:aws/cdk-ops+is:issue+label:bug+-label:p0+-label:p1+-label:p1+-label:p2+-label:response-requested${user}`,  {
            auth: {
                username: username,
                password: password
            }
            }).then(function (response) {
                if (response.data.total_count >= 5 && response.data.total_count < 10) {
                    unprioritized.innerText = response.data.total_count
                    unprioritized.parentElement.style.backgroundColor = '#f9ebb1'
                } else if (response.data.total_count >= 10) {
                    unprioritized.innerText = response.data.total_count
                    unprioritized.parentElement.style.backgroundColor = '#f9bab1'
                } else {
                    unprioritized.innerText = response.data.total_count
                }
                
            })
            .catch(function (error) {
                console.log('Bug unprioritized Error:', unprioritized, error.message);
            })
            .finally(function () {
                // always executed
        });
    })
    }, 180000)
    
    //Bugs p0
    setTimeout(function () {
    bugP0Links.forEach(p0 => {
        let user = ""
        if (p0.parentElement.parentElement.firstElementChild.innerText === 'UNASSIGNED') {
            user = '+no:assignee'
        } else if (p0.parentElement.parentElement.firstElementChild.innerText !== 'TOTAL') {
            user = `+assignee:${p0.parentElement.parentElement.firstElementChild.innerText}`
        }
        axios.get(`https://api.github.com/search/issues?q=is:open+repo:aws/aws-cdk+repo:aws/jsii+repo:aws-samples/aws-cdk-intro-workshop+repo:aws-samples/aws-cdk-examples+repo:aws/cdk-ops+is:issue+label:bug+label:p0${user}`,  {
            auth: {
                username: username,
                password: password
            }
            }).then(function (response) {
                if (response.data.total_count >= 2 && response.data.total_count < 5) {
                    p0.innerText = response.data.total_count
                    p0.parentElement.style.backgroundColor = '#f9ebb1'
                } else if (response.data.total_count >= 5) {
                    p0.innerText = response.data.total_count
                    p0.parentElement.style.backgroundColor = '#f9bab1'
                } else if (response.data.total_count === 0) {
                    p0.innerText = response.data.total_count
                    p0.parentElement.style.backgroundColor = '#c9f9b1'
                } else {
                    p0.innerText = response.data.total_count
                }
                
            })
            .catch(function (error) {
                console.log('Bug p0 Error:', p0, error.message);
            })
            .finally(function () {
                // always executed
        });
    })
    }, 240000)

    //Bugs p1
    setTimeout(function () {
    bugP1Links.forEach(p1 => {
        let user = ""
        if (p1.parentElement.parentElement.firstElementChild.innerText === 'UNASSIGNED') {
            user = '+no:assignee'
        } else if (p1.parentElement.parentElement.firstElementChild.innerText !== 'TOTAL') {
            user = `+assignee:${p1.parentElement.parentElement.firstElementChild.innerText}`
        }
        axios.get(`https://api.github.com/search/issues?q=is:open+repo:aws/aws-cdk+repo:aws/jsii+repo:aws-samples/aws-cdk-intro-workshop+repo:aws-samples/aws-cdk-examples+repo:aws/cdk-ops+is:issue+label:bug+label:p1${user}`,  {
            auth: {
                username: username,
                password: password
            }, 
            headers: {
                'User-Agent': 'request'
            }
            }).then(function (response) {
                if (response.data.total_count >= 15 && response.data.total_count < 20 && p1.parentElement.parentElement.firstElementChild.innerText !== 'TOTAL') {
                    p1.parentElement.style.backgroundColor = '#f6d17d'
                    p1.innerText = response.data.total_count
                } else if (response.data.total_count >= 20 && p1.parentElement.parentElement.firstElementChild.innerText !== 'TOTAL') {
                    console.log(user)
                    console.log('here?')
                    p1.parentElement.style.backgroundColor = '#f9bab1'
                    p1.innerText = response.data.total_count
                } else {
                    p1.innerText = response.data.total_count
                }
                
            })
            .catch(function (error) {
                console.log('Bug p1 Error:', p1, error.message);
            })
            .finally(function () {
                // always executed
        });
    })
    }, 300000)

    //Bugs p2
    setTimeout(function () {
    bugP2Links.forEach(p2 => {
        let user = ""
        if (p2.parentElement.parentElement.firstElementChild.innerText === 'UNASSIGNED') {
            user = '+no:assignee'
        } else if (p2.parentElement.parentElement.firstElementChild.innerText !== 'TOTAL') {
            user = `+assignee:${p2.parentElement.parentElement.firstElementChild.innerText}`
        }

        axios.get(`https://api.github.com/search/issues?q=is:open+repo:aws/aws-cdk+repo:aws/jsii+repo:aws-samples/aws-cdk-intro-workshop+repo:aws-samples/aws-cdk-examples+repo:aws/cdk-ops+is:issue+label:bug+label:p2${user}`,  {
            auth: {
                username: username,
                password: password
            }
            }).then(function (response) {
                p2.innerText = response.data.total_count                
            })
            .catch(function (error) {
                console.log('Bug p2 Error:', p2, error.message);
            })
            .finally(function () {
                // always executed
        });
    })
    }, 360000)


//------------------------------------------------------
    //P0 Table
    let p0Table = document.querySelector('#p0Table')
    let centerText = 'tg-nrix'

    setTimeout(function () {
    axios.get('https://api.github.com/search/issues?q=is:open+repo:aws/aws-cdk+repo:aws/jsii+repo:aws-samples/aws-cdk-intro-workshop+repo:aws-samples/aws-cdk-examples+repo:aws/cdk-ops+is:issue+label:bug+label:p0',  {
    auth: {
        username: username,
        password: password
    }
    }).then(function (response) {
            let issues = response.data.items
            issues.forEach(issue => {
                let today = new Date()
                let issueCreationDate = new Date(issue.created_at)
                let age = Math.floor((today - issueCreationDate) / (1000*60*60*24) + 1)
                let repo = issue.repository_url.substr(issue.repository_url.lastIndexOf('/') + 1)
                let assignee = issue.assignee.login
                let link = encodeURI(issue.html_url)
                let title = issue.title
                
                //Adding new row and populating it
                let newRow = p0Table.insertRow(-1);
                let ageCell = newRow.insertCell(0);
                let repoCell = newRow.insertCell(0);
                let assigneeCell = newRow.insertCell(0);
                let titleCell = newRow.insertCell(0);
                ageCell.className = centerText
                ageCell.innerText = age
                repoCell.className = centerText
                repoCell.innerText = repo
                assigneeCell.className = centerText
                assigneeCell.innerText = assignee
                //creating title link
                let issueTitle = document.createElement("a");
                issueTitle.setAttribute("href", link);
                issueTitle.innerHTML = title;
                issueTitle.className = centerText
                titleCell.appendChild(issueTitle)
                
            })
    })
    .catch(function (error) {
        // handle error
        console.log('p0 bugs', error.message);
    })
    .finally(function () {
        // always executed
    });
    }, 420000)

    //P1 Table
    let p1Table = document.querySelector('#p1Table')
    let p1Links = document.querySelectorAll('.tg-lboi')

    setTimeout(function () {
    p1Links.forEach(p1 => {
        //convert html url into api url
        let link = p1.children[0].href.slice(19)

        axios.get(`https://api.github.com/repos/${link}`,  {
        auth: {
            username: username,
            password: password
        }
        }).then(function (response) {
            let issue = response.data

            if (issue.state === "open") {
                let today = new Date()
                let issueCreationDate = new Date(issue.created_at)
                let age = Math.floor((today - issueCreationDate) / (1000*60*60*24) + 1)
                let ageElement = p1.parentElement.children[3]

                ageElement.innerText = age
            } else {
                let rowIndex = p1.parentElement.rowIndex
                p1Table.deleteRow(rowIndex);
            }                     
        })
        .catch(function (error) {
            // handle error
            console.log('p0 bugs', error.message);
        })
        .finally(function () {
            // always executed
        })
    })
    }, 480000)

    //RFC Table
    setTimeout(function () {
    let rfcTable = document.querySelector('#rfcTable')

    axios.get('https://api.github.com/search/issues?q=is:open+repo:aws/aws-cdk+repo:aws/jsii+repo:aws-samples/aws-cdk-intro-workshop+repo:aws-samples/aws-cdk-examples+repo:aws/cdk-ops+is:pr+label:management/rfc',  {
    auth: {
        username: username,
        password: password
    }
    }).then(function (response) {
            let issues = response.data.items
            let rfcs = [];
            let today = new Date()
            issues.forEach(issue => {
                let today = new Date()
                let issueCreationDate = new Date(issue.created_at)
                let age = Math.floor((today - issueCreationDate) / (1000*60*60*24) + 1)
                let repo = issue.repository_url.substr(issue.repository_url.lastIndexOf('/') + 1)
                let assignee = issue.assignee.login
                let link = encodeURI(issue.html_url)
                let title = issue.title

                //Adding new row and populating it
                let newRow = rfcTable.insertRow(-1);
                let ageCell = newRow.insertCell(0);
                let repoCell = newRow.insertCell(0);
                let assigneeCell = newRow.insertCell(0);
                let titleCell = newRow.insertCell(0);
                ageCell.className = centerText
                ageCell.innerText = age
                repoCell.className = centerText
                repoCell.innerText = repo
                assigneeCell.className = centerText
                assigneeCell.innerText = assignee
                //creating title link
                let issueTitle = document.createElement("a");
                issueTitle.setAttribute("href", link);
                issueTitle.innerHTML = title;
                issueTitle.className = centerText
                titleCell.appendChild(issueTitle)
            })
    })
    .catch(function (error) {
        // handle error
        console.log('RFC PRs', error.message);
    })
    .finally(function () {
        // always executed
    });
    }, 540000)

})