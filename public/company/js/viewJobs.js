const $applybtn=document.querySelector('.apply-btn')
const token=localStorage.getItem('token')
const jobbody=document.getElementById('job-body')
let usersContainer = document.getElementById("jobs");



window.onload=async()=>{
    console.log("onload")
    const result = await fetch(`/companypostedjobs?companyid=${localStorage.getItem('companyid')}`, {
        method: 'GET',
        headers: {
           
            'Authorization':'Bearer '+token
        },
        
    }).then((res) => res.json())
     
    const mappedUsers = result.map((job, index) => {
        return `<div class="job">
        <h1>Job Description</h1>
        <p>Company Name: ${job.companyname} </p>
        <p>Job Title: ${job.title}</p>
        <p>Experience level: ${job.yoe} years</p>
        <p>
          Job Responsibilities:${job.requirements}
        </p>
        <p>Work Type: ${job.worktype} </p>
        <p>Employee type: ${job.emptype} </p>
        <p>Employee benifits: ${job.empbenefits} </p>
        <button class="btn"><i class="fa-solid fa-download fa-1x"></i><a innerHtml="download About company" download="Aboutcompany.pdf" href="data:application/octet-stream;base64,${job.aboutcompany.companyData.toString('base64')}">  About Company</a></button><br />
      </div>`;
      });

      if(mappedUsers.length>0){
        usersContainer.innerHTML = mappedUsers
    }
      else{
        alert("Applications Empty") 
        //    usersContainer.innerHTML = "<h1>There are no pending applications to review, Please comeback later!</h1>"
           location.href="/company/companyindex.html"
      }

}
 
$searchbutton.addEventListener('click',async (e)=>{
  const companyName = document.getElementById('companyName').value
  const jobTitle = document.getElementById('jobTitle').value
  const Exp = document.getElementById('experience').value
  const jobType = document.getElementById('jobType').value
  const salary = document.getElementById('salary').value
  const searchterm = search.value.toLowerCase();
  //console.log(searchterm);
  const result1 = await fetch(`/companypostedjobs?companyid=${localStorage.getItem('companyid')}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+token
    } 
  }).then((res) => res.json())
  
  console.log(result1)
 const filterTitleFunction = (job)=>{
    // console.log(document.getElementById("filtertype").value)
   // const filtertype = document.getElementById("filtertype").value
   // console.log(job)
  // return filtertype == 1 ? job.companyname.toLowerCase().includes(searchterm) : filtertype == 2 ? job.title.toLowerCase().includes(searchterm) : filtertype == 3 ? job.yoe.toString().includes(searchterm) : job.worktype.toLowerCase().includes(searchterm)
  if(searchterm) {
    return  parseInt(job.yoe) == parseInt(searchterm) || job.companyname.toLowerCase().includes(searchterm) || job.title.toLowerCase().includes(searchterm) || job.worktype.toLowerCase().includes(searchterm) || parseInt(job.empbenefits) == parseInt(searchterm)
   }
