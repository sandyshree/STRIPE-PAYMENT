let express=require('express');
let path=require('path');
let bodyParser=require('body-parser');

var Publishable_Key=''
var Secret_Key=''
const stripe=require('stripe')(Secret_Key)

let app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('view engine','ejs');
app.set('views',path.join(__dirname));

app.get("/",function(req,res){
    res.render('home',{
        key:Publishable_Key
    });
});

app.post('/payment',function(req,res){
    stripe.customers.create({
        email:req.body.stripeEmail,
        source:req.body.stripeToken,
        name:"Meenu",
        address:{
            city:'chennai',
            state:'Tamilnadu',
            country:"India",
        }
    })
    .then((customer)=>{
        return stripe.charges.create({
            amount:2500,
            description:"web develo products",
            currency:'usd',
            customer:customer.id
        });
    })
    .then((charge)=>{
    res.render("success")
})
    .catch((err)=>{
        res.send(err)
    });
})
app.listen(8001,()=>{
    console.log("server is running on  http://localhost:8001");
});