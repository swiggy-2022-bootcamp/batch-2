/**
 *  ES-6
 */


const oddEven = a => 
{
    return a % 2 == 0;
}

const oddEvenOneLine = a => a % 2 == 0;

var num = prompt("Enter Number: ");
oddEven(num)  ? console.log(`${num} is Even.`) : console.log(`${num} is Odd.`);

var num2 = prompt("Enter Number: ");
oddEvenOneLine(num2) ? console.log(`${num2} is Even.`) : console.log(`${num2} is Odd.`);

/******************************************************************************************************************************************************************/

var user = [{
    name: "ABC",
    age:23,
    phone:+91123456789,
    email:abc@xyz.com,
    address:{
        area:"Urban",
        city:"XYZ",
        state:"ABC",
        country:"IND",
        pincode:123456
    },
    order_details:{
        order_id:123456799,
        order_date:"05-01-2022",
        order_status:"CNF",
        ordered_time:"09:20:00",
        deliver_time:""
    }
}
]

/*******************************************************************************************************************************************************************/
