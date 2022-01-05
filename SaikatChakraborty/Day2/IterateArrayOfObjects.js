let objects=[
    {'name':"Saikat",'title':"Chakraborty",'Roll':18},
    {'name':"Rounak",'title':"Saha",'Roll':23},
    {'name':"Vikash",'title':"Kumar",'Roll':45}
];
console.log(objects);
//Iterate throught the objects and print the name and roll numbers 
for(i=0;i<objects.length;i++){
    console.log(`Name:${objects[i].name}Roll no:${objects[i].Roll}\n`); 
}
//Iterate through the objects and print 
//those students who have roll number>40

for(i=0;i<objects.length;i++){
    if(objects[i].Roll>40)
        console.log(`Name:${objects[i].name},Title:${objects[i].title},roll number:${objects[i].Roll}`);
}
