const apiUrl= 'https://api.github.com/repos/Abhaydeomane/gitupload/contents/test.txt'
let shaKey="";

async function loadshakey(){
    async function getFileSha() {
        try {
            const response = await axios.get(apiUrl);
            const data = response.data;
            shaKey = data.sha;
            console.log('SHA key of the file:', shaKey);
        } catch (error) {
            console.error('There was a problem with your axios operation:', error);
        }
    }
    
    getFileSha();
}

async function fun(){
    console.log(shaKey);

    var formdata={}
    formdata.name = document.getElementById('name').value;
    formdata.email = document.getElementById('email').value;
    console.log(formdata);
    // Convert formdata object to JSON string
    var jsonData = JSON.stringify(formdata, null, 2);

    // Save JSON data to a variable
    var jsonFile = jsonData;

    //console.log(jsonFile); // Display the JSON data in the console
    var base64EncodedData = btoa(jsonData);
    console.log(base64EncodedData);



    const responce =axios({
        method: 'put',

        url: apiUrl,
        headers: {
            'Authorization': 'bearer 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',
            'Content-Type': 'application/json',
            'X-GitHub-Api-Version': '2022-11-28'
        },
        data: {
            sha: shaKey,
            message: 'my commit message',
            content: base64EncodedData,
            committer: {
                name: 'Abhay Deomane',
                email: 'abhaydeomane4321@.com'
            }
        }
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
    
    // Log the response data to the console
    console.log(response.data);
    

}