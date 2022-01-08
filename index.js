const express = require('express')
const cors = require('cors')
const app = express();
const { m2_usuarios, m2_equipes } = require('./models');
app.listen(5500, () => console.log('Rodando na porta 5500'))



app.use(cors())

app.use(express.json())

console.log(m2_equipes)

app.route('/api').get((req, res) => res.json({ 
	
}))
