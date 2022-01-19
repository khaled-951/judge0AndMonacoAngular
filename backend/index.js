const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors');
const { response } = require('express');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    return res.json({"data": "hello world !"});
})

app.post('/attempt/', async (req, res) =>{
    //console.log(req.body);
    axios.post('https://judge0-ce.p.rapidapi.com/submissions', 
        {
            language_id: 63,
            source_code: req.body.source_code,
            stdin: req.body.stdin,
            expected_output: req.body.expected_stdout
        },
        {
            params: {base64_encoded: 'true', fields: '*'},
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                'x-rapidapi-key': '6e1dda5cd8mshffb0dd0159dd266p113a0cjsn2dbc893a8c27'
            }
        })
    .then(data =>{
        axios.get('https://judge0-ce.p.rapidapi.com/submissions/' + data.data.token,{
            params: {base64_encoded: 'true', fields: '*'},
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                'x-rapidapi-key': '6e1dda5cd8mshffb0dd0159dd266p113a0cjsn2dbc893a8c27'
            }
        }).then(response => {  return res.json({ result: response.data.status.description, debug: response.data.stdout}); });
        //console.log(data.data.token);
        //return res.json(data.data);
    });
})

app.listen(3000)