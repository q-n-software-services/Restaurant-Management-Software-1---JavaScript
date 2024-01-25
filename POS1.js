/*localStorage.clear();

localStorage.setItem('totalSale', 0);
localStorage.setItem('totalProductsSold', 0);
localStorage.setItem('totalDiscount', 0);
localStorage.setItem('totalVAT', 0);
localStorage.setItem('totalAmountGenerated',0);

localStorage.setItem('reciptNumber', 0);
localStorage.setItem('available_ids', JSON.stringify([]));
localStorage.setItem('max_id', 0);
localStorage.setItem('customer_count', 0);
localStorage.setItem('reciptNumber', 0);

localStorage.setItem('all_day_customers', JSON.stringify([]));


localStorage.setItem("weeklyReport", JSON.stringify([{'day':0}, {'totalSales':0}, {'totalProductsSold':0}, {'totalDiscount':0}, {'totalVAT':0}, {'totalAmountGenerated':0}, {'netCashFlow':0} ]));
localStorage.setItem("monthlyReport", JSON.stringify([{'day':0}, {'totalSales':0}, {'totalProductsSold':0}, {'totalDiscount':0}, {'totalVAT':0}, {'totalAmountGenerated':0}, {'netCashFlow':0} ]));
*/

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



function saveStaticDataToFile() {

  let data = '';

  all_day_customers = JSON.parse(localStorage.getItem('all_day_customers'));

  all_day_customers.forEach(customer => {
    data += 'Customer # ' + String(customer[0].customer_count) + ' \n';
    customer[1].bill.forEach(myitem => {
      data += `${myitem[1]} x ${myitem[0]}(SAR ${myitem[2]}) = SAR ${myitem[3]}\n`;
    })
    data += `Total Bill = SAR ${customer[2].total_bill}\n`;
    data += `VAT = SAR ${customer[6].VAT}\n`;
    data += `Total Bill inc. VAT = SAR ${customer[7].total_inc_VAT}\n`;
    data += `Amount Paid = SAR ${customer[3].amountPaid}\n`;
    data += `Discount = SAR ${customer[4].discount}\n`;
    data += `Balance = SAR ${customer[5].balance}\n\n`;
  })

  totalVAT = Number(localStorage.getItem('totalVAT'));
  totalAmountGenerated = Number(localStorage.getItem('totalAmountGenerated'));

  data += `Total Sale = SAR ${totalSales}\n`;
  data += `Total Products Sold = ${totalProductSold}\n`;
  data += `Total Discount = SAR ${totalDiscount}\n`;
  data += `Total VAT = SAR ${totalVAT}\n`;
  data += `Total Amount Generated excluding discounts = SAR ${totalAmountGenerated}\n`;
  data += `Net Cash Flow = SAR ${(totalAmountGenerated - totalDiscount)}\n\n`;

  let weeklyReport = JSON.parse(localStorage.getItem('weeklyReport'));
  let day = Number(weeklyReport[0].day);
  day += 1;
  let ts = Number(weeklyReport[1].totalSales);
  ts += Number(totalSales);
  let tps = Number(weeklyReport[2].totalProductsSold);
  tps += Number(totalProductSold);
  let td = Number(weeklyReport[3].totalDiscount);
  td += Number(totalDiscount);
  let tv = Number(weeklyReport[4].totalVAT);
  tv += Number(totalVAT);
  let tAG = Number(weeklyReport[5].totalAmountGenerated);
  tAG += Number(totalProductSold);
  let ncf = Number(weeklyReport[6].netCashFlow);
  ncf += Number(totalAmountGenerated - totalDiscount);

  localStorage.setItem("weeklyReport", JSON.stringify([{'day':day}, {'totalSales':ts}, {'totalProductsSold':tps}, {'totalDiscount':td}, {'totalVAT':tv}, {'totalAmountGenerated':tAG}, {'netCashFlow':ncf} ]));


  let monthlyReport = JSON.parse(localStorage.getItem('monthlyReport'));
  let day2 = Number(monthlyReport[0].day);
  day2 += 1;
  let ts2 = Number(monthlyReport[1].totalSales);
  ts2 += Number(totalSales);
  let tps2 = Number(monthlyReport[2].totalProductsSold);
  tps2 += Number(totalProductSold);
  let td2 = Number(monthlyReport[3].totalDiscount);
  td2 += Number(totalDiscount);
  let tv2 = Number(monthlyReport[4].totalVAT);
  tv2 += Number(totalVAT);
  let tAG2 = Number(monthlyReport[5].totalAmountGenerated);
  tAG2 += Number(totalProductSold);
  let ncf2 = Number(monthlyReport[6].netCashFlow);
  ncf2 += Number(totalAmountGenerated - totalDiscount);

  localStorage.setItem("monthlyReport", JSON.stringify([{'day':day2}, {'totalSales':ts2}, {'totalProductsSold':tps2}, {'totalDiscount':td2}, {'totalVAT':tv2}, {'totalAmountGenerated':tAG2}, {'netCashFlow':ncf2} ]));


  myArray.forEach(sale => {
    data += `${sale.sold} X ${sale.name}(SAR ${sale.price}) Sold = SAR ${Number(sale.sold) * Number(sale.price)}\n`;



  })

  let ids12 = JSON.parse(localStorage.getItem('available_ids'));
  for (id12 of ids12) {
    localStorage.setItem(`sold${id12}`, 0);
  }

  localStorage.setItem('totalSale', 0);
  localStorage.setItem('totalProductsSold', 0);
  localStorage.setItem('totalDiscount', 0);
  localStorage.setItem('totalVAT', 0);
  localStorage.setItem('totalAmountGenerated', 0);
  localStorage.setItem("customer_count", 0);


  data += '\n\n';




  // Convert the text to BLOB.
  const textToBLOB = new Blob([data], { type: 'text/plain' });
  const sFileName = 'results.txt';	   // The file to save the data.

  let newLink = document.createElement("a");
  newLink.download = sFileName;

  if (window.webkitURL != null) {
    newLink.href = window.webkitURL.createObjectURL(textToBLOB);
  }
  else {
    newLink.href = window.URL.createObjectURL(textToBLOB);
    newLink.style.display = "none";
    document.body.appendChild(newLink);
  }

  newLink.click();

  generateWeeklyReport();
  generateMonthlyReport();
}

const generateWeeklyReport = () => {
  let data = '';

  let weeklyReport2 = JSON.parse(localStorage.getItem('weeklyReport'));

  let day = Number(weeklyReport2[0].day);
  if (day < 7){
    console.log(`No Weekly report day ${day}`)
    return
  }

  let ts = Number(weeklyReport2[1].totalSales);
  data += `Total Sales = SAR ${ts}\n Average Sales per day = SAR ${(Number(ts)/7)}\n\n`;
  let tps = Number(weeklyReport2[2].totalProductsSold);
  data += `Total Products Sold = ${tps}\n Average Products Sold per day = ${(Number(tps)/7)}\n\n`;
  let td = Number(weeklyReport2[3].totalDiscount);
  data += `Total Discount = SAR ${td}\n Average Discount per day = SAR ${(Number(td)/7)}\n\n`;
  let tv = Number(weeklyReport2[4].totalVAT);
  data += `Total VAT accumulated = SAR ${tv}\n Average VAT per day = SAR ${(Number(tv)/7)}\n\n`;
  let tAG = Number(weeklyReport2[5].totalAmountGenerated);
  data += `Total Amount Generated = SAR ${tAG}\n Average Amount Generated per day = SAR ${(Number(tAG)/7)}\n\n`;
  let ncf = Number(weeklyReport2[6].netCashFlow);
  data += `Total Net Cash Flow = SAR ${ncf}\n Average Net Cash Flow per day = SAR ${(Number(ncf)/7)}\n\n`;

  localStorage.setItem("weeklyReport", JSON.stringify([{'day':0}, {'totalSales':0}, {'totalProductsSold':0}, {'totalDiscount':0}, {'totalVAT':0}, {'totalAmountGenerated':0}, {'netCashFlow':0} ]));



  data += '\n\n';

  // Convert the text to BLOB.
  const textToBLOB = new Blob([data], { type: 'text/plain' });
  const sFileName = 'weeklyReport.txt';	   // The file to save the data.

  let newLink = document.createElement("a");
  newLink.download = sFileName;

  if (window.webkitURL != null) {
    newLink.href = window.webkitURL.createObjectURL(textToBLOB);
  }
  else {
    newLink.href = window.URL.createObjectURL(textToBLOB);
    newLink.style.display = "none";
    document.body.appendChild(newLink);
  }

  newLink.click();

}

const generateMonthlyReport = () => {
  let data = '';

  let monthlyReport2 = JSON.parse(localStorage.getItem('monthlyReport'));

  let day2 = Number(monthlyReport2[0].day);
  if (day2 < 30){
    console.log(`No Monthly report day ${day2}`)
    return
  }

  let ts = Number(monthlyReport2[1].totalSales);
  data += `Total Sales = SAR ${ts}\n Average Sales per day = SAR ${(Number(ts)/30)}\n\n`;
  let tps = Number(monthlyReport2[2].totalProductsSold);
  data += `Total Products Sold = ${tps}\n Average Products Sold per day = ${(Number(tps)/30)}\n\n`;
  let td = Number(monthlyReport2[3].totalDiscount);
  data += `Total Discount = SAR ${td}\n Average Discount per day = SAR ${(Number(td)/30)}\n\n`;
  let tv = Number(monthlyReport2[4].totalVAT);
  data += `Total VAT accumulated = SAR ${tv}\n Average VAT per day = SAR ${(Number(tv)/30)}\n\n`;
  let tAG = Number(monthlyReport2[5].totalAmountGenerated);
  data += `Total Amount Generated = SAR ${tAG}\n Average Amount Generated per day = SAR ${(Number(tAG)/30)}\n\n`;
  let ncf = Number(monthlyReport2[6].netCashFlow);
  data += `Total Net Cash Flow = SAR ${ncf}\n Average Net Cash Flow per day = SAR ${(Number(ncf)/30)}\n\n`;

  localStorage.setItem("monthlyReport", JSON.stringify([{'day':0}, {'totalSales':0}, {'totalProductsSold':0}, {'totalDiscount':0}, {'totalVAT':0}, {'totalAmountGenerated':0}, {'netCashFlow':0} ]));



  data += '\n\n';

  // Convert the text to BLOB.
  const textToBLOB = new Blob([data], { type: 'text/plain' });
  const sFileName = 'monthlyReport.txt';	   // The file to save the data.

  let newLink = document.createElement("a");
  newLink.download = sFileName;

  if (window.webkitURL != null) {
    newLink.href = window.webkitURL.createObjectURL(textToBLOB);
  }
  else {
    newLink.href = window.URL.createObjectURL(textToBLOB);
    newLink.style.display = "none";
    document.body.appendChild(newLink);
  }

  newLink.click();
}

let menu12 = document.getElementById('menu');

let totalSales = Number(localStorage.getItem('totalSale'));
let totalProductSold = Number(localStorage.getItem('totalProductsSold'));
let totalDiscount = Number(localStorage.getItem('totalDiscount'));
let totalVAT = Number(localStorage.getItem('totalVAT'));
let totalAmountGenerated = Number(localStorage.getItem('totalAmountGenerated'));



let myArray = [];



let ids = JSON.parse(localStorage.getItem('available_ids'));

let max_id = Number(localStorage.getItem('max_id'));



for (i of ids) {
  let name12 = localStorage.getItem(`name${i}`);
  let image_link12 = localStorage.getItem(`image_link${i}`);
  let price12 = localStorage.getItem(`price${i}`);
  let sold12 = localStorage.getItem(`sold${i}`);
  let stock12 = localStorage.getItem(`stock${i}`);
  let details12 = localStorage.getItem(`details${i}`);

  let product_list = { name: name12, image_link: image_link12, id: i, price: Number(price12), sold: Number(sold12), stock: Number(stock12), details: details12 };
  myArray.push(product_list);

}


let info = null;


let customer_count = localStorage.getItem("customer_count");
let bill = [];
let actual_quantity = 1;

let all_day_customers = JSON.parse(localStorage.getItem('all_day_customers'));
let thisCustomer = [];


try {
  myArray.forEach(data => {
    menu12.innerHTML += `<div id="${data['id']}" class="item" data-bs-toggle="popover" title="ID :  ${data['id']}" data-bs-content=" " value="${data['name']}"><div class='col'><div class="card" style="height:290px; width: 290px;">
          <div class="card-image">
          <img src="${data['image_link']}" style="height:200px; width: 290px;"></a>
          </div>
          <div class="card-content">   
          <div class="container"><pre><h3 style="text-align: center;" id='name${data['id']}'>${data['name']}</h3><span style="text-align: left; color:red;" id='stock${data['id']}'>${String(data['stock'])}</span> <h6 style="text-align: right" id='price${data['id']}'>${"                      SAR " + String(data['price'])}</h6></pre></div><div class="card-action"></a></div>
          </div>
          </div>
          </div></div>`
  });


}
catch {
  console.log("We are on recipt printing page");
}
let items = document.querySelectorAll('.item');
items.forEach(item => {
  item.onclick = () => {
    console.log(item.id)
    let product_data = null;
    myArray.forEach(data => { if (item.id == data['id']) { product_data = data } })
    let quantity = null;


    quantity = prompt(`1 ${product_data['name']} selected, please input a number if more than 1 is ordered`);
    if (quantity !== null && quantity !== undefined) { actual_quantity = Number(quantity) };
    if (actual_quantity == 0) { actual_quantity = 1 };

    let amount = actual_quantity * product_data['price'];



    let details = [product_data['name'], actual_quantity, product_data['price'], amount];
    bill.push(details);

    product_data['stock'] -= actual_quantity;
    product_data['sold'] += actual_quantity;

    localStorage.setItem(`stock${item.id}`, product_data['stock']);
    localStorage.setItem(`sold${item.id}`, product_data['sold']);

    let c = Number(item.id) - 1;

    myArray[c].stock = product_data['stock'];
    myArray[c].sold = product_data['sold'];




    let updator = document.getElementById(`stock${product_data['id']}`);
    updator.innerText = product_data['stock'];





  }
})


console.log(document.title);
const amountInput = document.getElementById('amount')
const discountInput = document.getElementById('discount')
const balanceInput = document.getElementById('balance')
const modal2 = document.getElementById('modal-body2');
document.getElementById("discount").defaultValue = 0;
let table = document.getElementById("checkout_table");
let amountPaid = 0;
let discount = 0;
let total_bill = 0;

function checkout() {
  total_bill = 0
  customer_count = Number(localStorage.getItem("customer_count"));
  customer_count += 1;
  localStorage.setItem("customer_count", customer_count);

  let slip = '';


  let content = '';
  let count = 1;
  bill.forEach(product => {
    console.log(product[0], product[1], product[2], product[3]);
    total_bill += Number(product[3]);
    content += `<tr>
            <th scope="row">${count}</th>
            <td>${product[0]}</td>
            <td>${product[1]}</td>
            <td>${product[2]}</td>
            <td>${product[3]}</td>
          </tr>`



    count += 1
  });

  console.log({ total_bill });
  content += `<tr>
        <th scope="row"> </th>
        <td> </td>
        <td>Total Amount</td>
        <td>${total_bill}</td>
        <td> </td>
        
      </tr>
      
      <tr>
        <td class="quantity"></td>
        
        <td class="description">VAT</td>
        <td ></td>
        <td class="quantity">${(0.15 * total_bill).toFixed(2)}</td>
        <td class="price"></td>
        </tr>
        
      <tr>
        <td class="quantity"></td>
        
        <td class="description">Net Amount inc. VAT</td>
        <td ></td>
        <td class="quantity">${((0.15 * total_bill) + total_bill).toFixed(2)}</td>
        <td class="price"></td>
        </tr>`


  table.innerHTML = content;

  totalProductSold = Number(localStorage.getItem('totalProductsSold'));
  totalProductSold += (count - 1);
  localStorage.setItem('totalProductsSold', totalProductSold);

  totalSales = Number(localStorage.getItem('totalSale'));
  totalSales += total_bill;
  localStorage.setItem('totalSale', totalSales);


  thisCustomer.push({ customer_count }, { bill }, { total_bill });








}

let payoutBtn = document.getElementById("payoutBtn");
payoutBtn.onclick = () => {
  amountPaid = Number(amountInput.value);






  try {
    discount = Number(discountInput.value);
  }
  catch (err) {
    discount = 0;
  }

  console.log(amountPaid);
  console.log({ discount });






  totalDiscount = Number(localStorage.getItem('totalDiscount'));
  totalDiscount += discount;
  localStorage.setItem('totalDiscount', totalDiscount);


  console.log({ total_bill });

  const balance = (amountPaid - (total_bill * 1.15) + discount).toFixed(2);

  thisCustomer.push({ amountPaid }, { discount }, { balance }, { 'VAT': (total_bill * 0.15) }, { 'total_inc_VAT': (total_bill * 1.15) });

  all_day_customers.push(thisCustomer);

  localStorage.setItem("all_day_customers", JSON.stringify(all_day_customers));

  let okay_btn = document.getElementById('okay');

  let slip = '';

  let now = Date();
  let VAT = (0.15 * total_bill).toFixed(2);
  totalVAT = Number(localStorage.getItem('totalVAT'));
  totalVAT += Number(VAT);
  localStorage.setItem('totalVAT', totalVAT);

  let Total_with_VAT = (total_bill * 1.15).toFixed(2);
  totalAmountGenerated = Number(localStorage.getItem('totalAmountGenerated'));
  totalAmountGenerated += Number(Total_with_VAT);
  localStorage.setItem('totalAmountGenerated', totalAmountGenerated);

  let recipt_number = Number(localStorage.getItem('reciptNumber'));



  const cyrb53 = function (str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  };

  let recipt_hash = cyrb53(recipt_number);


  if (balance < 0) {

    modal2.innerHTML = `<div class="container">
        <h1 id='balance' style="text-align: center; font-family: 'Times New Roman', Times, serif; background-color: red; color: antiquewhite; border-radius: 1cm;">Amount paid must be greater than the bill otherwise add some discount amount</h1>
      </div>`

    okay_btn.onclick = () => {
      alert("Please Click the CHECKOUT button and enter a valid AMOUNT to proceed or enter a discount value")
    };


  } else {
    modal2.innerHTML = `<div class="container">
        <h1 id='balance' style="text-align: center; font-family: 'Times New Roman', Times, serif; background-color: forestgreen; color: antiquewhite; border-radius: 1cm;">Balance : ${balance}</h1>
      </div>`
    okay_btn.onclick = () => {

      count = 1;
      bill.forEach(product => {
        console.log(product[0], product[1], product[2], product[3]);

        slip += `<tr>
        <td class="srNum">${count}</td>
        <td class="description">${product[0]}</td>
        <td class="price">${product[2]}</td>
        <td class="quantity">${product[1]}</td>
        <td class="price">${product[3]}</td>
        </tr>`



        count += 1
      });


      slip += `
      <tr>
        <td class="quantity">___</td>
        
        <td class="description">________</td>
        <td >___</td>
        <td class="quantity">_____</td>
        <td class="price">____</td>
        </tr>
        
        <tr>
        <td class="quantity"></td>
      
        <tr>
        <td class="quantity"></td>
        
        <td class="description">Total Amount</td>
        <td ></td>
        <td class="quantity">${total_bill}</td>
        <td class="price"></td>
        </tr>
        <tr>
        <td class="quantity"></td>
        
        <td class="description">Discount</td>
        <td ></td>
        <td class="quantity">${discount}</td>
        <td class="price"></td>
        </tr>
        
        <tr>
        <td class="quantity"></td>
        
        <td class="description">VAT</td>
        <td ></td>
        <td class="quantity">${(0.15 * total_bill).toFixed(2)}</td>
        <td class="price"></td>
        </tr>
        
        <tr>
        <td class="quantity"></td>
        
        <td class="description">Net Amount</td>
        <td ></td>
        <td class="quantity">${((0.15 * total_bill) + total_bill).toFixed(2)}</td>
        <td class="price"></td>
        </tr>
        
        <tr>
        <td class="quantity"></td>
        
        <td class="description">Amount Paid</td>
        <td ></td>
        <td class="quantity">${amountPaid}</td>
        <td class="price"></td>
        </tr>
        
        <tr>
        <td class="quantity"></td>
        
        <td class="description">Balance</td>
        <td ></td>
        <td class="quantity">${balance}</td>
        <td class="price"></td>
        </tr>`

      let myslip = `<div class="ticket">
  <img src="images/logo.jpeg" alt="">
  <p class="centered">Lahori Village Restaurant
      <br> By: Smart Standards for food service (SSC)
      <br>2667 Prince Nayef Bin Abdulaziz Street - King Fahd Riyadh, Saudi Arabia 12271
      <br>Phone no +966565566003
      <br>VAT NO: 311221066200003
  </p>
  <table>
      <thead>
          <tr>
              <th class="srNum">Sr#</th>
              <th class="description">Name</th>
              <th class="price">Price</th>
              <th class="quantity">Qty</th>
              <th class="price">Total</th>
          </tr>
      </thead>
      <tbody id="slipBody">
            ${slip}

      </tbody>
  </table>
  

  <p class="centered">Thanks for your purchase!</p>
  <h6 class="centered">Simplified Tax Invoice</h6>
  <h6 class="centered" id="reciptNum"></h6>
  <p class="centered" id="hash"></p>
  <canvas class="centered" id="qr-code"></canvas>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>`;




      let restorePage = document.body.innerHTML;
      let printcontent = myslip;
      recipt_number += 1;
      localStorage.setItem('reciptNumber', recipt_number);

      document.body.innerHTML = printcontent;
      document.getElementById('reciptNum').innerText = 'Recipt # ' + String(recipt_number);
      document.getElementById('hash').innerText = `${recipt_hash}`;
      var qr;
      var qrtext = `Lahori  Village Restaurant \n By \n Smart Standards for food service (SSC) \n VAT NO: 311221066200003 \n ${now} \n VAT amount = ${VAT} \n Total amount with VAT = ${Total_with_VAT} \n Date : ${now}`;

      (function () {
        qr = new QRious({
          element: document.getElementById('qr-code'),
          size: 200,
          value: qrtext
        });
      })();

      console.log("Hello");
      sleep(1000).then(() => { window.print(); });
      sleep(1000).then(() => { window.print(); });
      sleep(1000).then(() => { total_bill -= discount; });
      sleep(1000).then(() => { location.reload(); });


      bill = []
      amountPaid = 0;
      discount = 0;
      total_bill = 0;
      modal2.innerHTML = '<div> </div>';
      table.innerHTML = '<div> </div>';
      amountInput.value = '';
      discountInput.value = 0;
      thisCustomer = [];



    };
  }
}


let id = null;
let modal4 = document.getElementById('modal-body4');
let modal5 = document.getElementById('modal-body5');

let modal4_footer = document.getElementById('modal-footer4');
let modal5_footer = document.getElementById('modal-footer5');

let proceed_btn4 = document.getElementById("proceed-button4");
let proceed_btn5 = document.getElementById("proceed-button5");

let id_input1 = document.getElementById("inputGroup-sizing-lg4");
let id_input2 = document.getElementById("inputGroup-sizing-lg5");

proceed_btn4_onclick = () => {
  console.log("button proceed 4 working fine");

  id = id_input1.value;
  stockme = localStorage.getItem(`stock${id}`);
  soldme = localStorage.getItem(`sold${id}`);
  priceme = localStorage.getItem(`price${id}`);
  nameme = localStorage.getItem(`name${id}`);
  image_linkme = localStorage.getItem(`image_link${id}`);
  detailsme = localStorage.getItem(`details${id}`);

  console.log(id);
  console.log(nameme, image_linkme, priceme, soldme, stockme, detailsme);


  if (id <= max_id) {
    modal4.innerHTML = `<form class="row g-3">
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Name</label>
    <input type="text" class="form-control" id="inputName42" value="${nameme}">
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Price</label>
    <input type="number" class="form-control" id="inputName422" value="${priceme}">
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label">Image Link</label>
    <input type="text" class="form-control" id="inputImage2" value="${image_linkme}">
  </div>
  <div class="col-12">
    <label for="inputAddress2" class="form-label">Details</label>
    <input type="text" class="form-control" id="inputDetails2" value="${detailsme}">
  </div>
  <div class="col-md-6">
    <label for="inputCity" class="form-label">Stock</label>
    <input type="number" class="form-control" id="inputStock2" value="${stockme}">
  </div>
  
</form>`
    modal4_footer.innerHTML = `<button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="remove_item()">Remove</button>`

  }
}




proceed_btn5_onclick = () => {
  console.log("button proceed 5 working fine");

  id = id_input2.value;

  stockme2 = localStorage.getItem(`stock${id}`);
  soldme2 = localStorage.getItem(`sold${id}`);
  priceme2 = localStorage.getItem(`price${id}`);
  nameme2 = localStorage.getItem(`name${id}`);
  image_linkme2 = localStorage.getItem(`image_link${id}`);
  detailsme2 = localStorage.getItem(`details${id}`);
  

  if (id <= max_id) {
    modal5.innerHTML = `<form class="row g-3">
    <div class="col-md-6">
      <label for="inputEmail4" class="form-label">Name</label>
      <input type="text" class="form-control" id="inputName43" value="${nameme2}">
    </div>
    <div class="col-md-6">
      <label for="inputPassword4" class="form-label">Price</label>
      <input type="number" class="form-control" id="inputName433" value="${priceme2}">
    </div>
    <div class="col-12">
      <label for="inputAddress" class="form-label">Image Link</label>
      <input type="text" class="form-control" id="inputImage3" value="${image_linkme2}">
    </div>
    <div class="col-12">
      <label for="inputAddress2" class="form-label">Details</label>
      <input type="text" class="form-control" id="inputDetails3" value="${detailsme2}">
    </div>
    <div class="col-md-6">
      <label for="inputCity" class="form-label">Stock</label>
      <input type="number" class="form-control" id="inputStock3" value="${stockme2}">
    </div>
    
  </form>`

    modal5_footer.innerHTML = `<button type="button" class="btn btn-info" data-bs-dismiss="modal" onclick="save_changes_edit()">Save Changes</button>`
  }
}

const proceed_add = () => {
  let name_add = document.getElementById('inputName4').value;
  let image_link_add = document.getElementById('inputImage').value;
  let price_add = document.getElementById('inputPrice4').value;
  let details_add = document.getElementById('inputDetails').value;
  let stock_add = document.getElementById('inputStock').value;

  let id_now = String(Number(localStorage.getItem('max_id')) + 1);


  localStorage.setItem(`name${id_now}`, name_add);
  localStorage.setItem(`image_link${id_now}`, image_link_add);
  localStorage.setItem(`price${id_now}`, price_add);
  localStorage.setItem(`stock${id_now}`, stock_add);
  localStorage.setItem(`details${id_now}`, details_add);
  localStorage.setItem(`sold${id_now}`, 0);
  


  localStorage.setItem("max_id", id_now);

  let ids2 = JSON.parse(localStorage.getItem('available_ids'));
  ids2.push(Number(id_now));
  localStorage.setItem("available_ids", JSON.stringify(ids2));

  location.reload();

};

const proceed_remove = () => {
  modal4.innerHTML = `<div class="input-group input-group-lg">
  <span class="input-group-text" >ID</span>
  <input type="number" id="inputGroup-sizing-lg4" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder="Enter ID of Product to be removed here">
</div>
<br>
<br>
<div class="d-grid gap-2 col-6 mx-auto">
  <button class="btn btn-info" type="button" id="proceed-button4" onclick="proceed_btn4_onclick()">Proceed</button>
</div>`

  modal4_footer.innerHTML = '<div></div>'
};

const proceed_edit = () => {
  modal5.innerHTML = `<div class="input-group input-group-lg">
  <span class="input-group-text" >ID</span>
  <input type="number" id="inputGroup-sizing-lg5" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" placeholder="Enter ID of Product to be edited here">
</div>
<br>
<br>
<div class="d-grid gap-2 col-6 mx-auto">
  <button class="btn btn-info" type="button" id="proceed-button5" onclick="proceed_btn5_onclick()">Proceed</button>
</div>`

  modal5_footer.innerHTML = '<div></div>'
};

let netIncome = 0;
netIncome = totalSales - totalDiscount;

console.log({ netIncome });

console.log(all_day_customers);



const save_changes_edit = () => {
  let name_edit = document.getElementById('inputName43').value;
  let image_link_edit = document.getElementById('inputImage3').value;
  let price_edit = document.getElementById('inputName433').value;
  let details_edit = document.getElementById('inputDetails3').value;
  let stock_edit = document.getElementById('inputStock3').value;

  id = String(Number(id));

  localStorage.setItem(`name${id}`, name_edit);
  localStorage.setItem(`image_link${id}`, image_link_edit);
  localStorage.setItem(`price${id}`, price_edit);
  localStorage.setItem(`stock${id}`, stock_edit);
  localStorage.setItem(`details${id}`, details_edit);

  location.reload();
  proceed_edit();
};


const remove_item = () => {
  let name_edit = document.getElementById('inputName42').value;
  let image_link_edit = document.getElementById('inputImage2').value;
  let price_edit = document.getElementById('inputName422').value;
  let details_edit = document.getElementById('inputDetails2').value;
  let stock_edit = document.getElementById('inputStock2').value;

  id = String(Number(id));

  localStorage.removeItem(`name${id}`);
  localStorage.removeItem(`image_link${id}`);
  localStorage.removeItem(`price${id}`);
  localStorage.removeItem(`stock${id}`);
  localStorage.removeItem(`details${id}`);
  localStorage.removeItem(`sold${id}`);

  let ids3 = JSON.parse(localStorage.getItem('available_ids'));
  for (i in ids3) {
    if (ids3[i] == id) {
      ids3.splice(i, 1);
    }
  }
  localStorage.setItem("available_ids", JSON.stringify(ids3));

  location.reload();
  proceed_remove();
};


const generate_results = () => {

};

let results_btn = document.getElementById('generate_results');
results_btn.onclick = () => {
  saveStaticDataToFile()
  localStorage.setItem(`all_day_customers`, JSON.stringify([]));
}






/* The End */









/* {name: 'Chicken Biryani', image_link: 'images/biryani.png', id: 1, price: 20, sold:0, stock: 50, details: 'Spicy Biryani with Potato and chicken' },
    {name: 'French Fries', image_link: 'images/french fries.png', id: 2, price: 10, sold:0, stock: 80, details: 'Tasty and spicy French Fries' },
    {name: 'Daal Roti', image_link: 'images/daal roti.png', id: 3, price: 20, sold:0, stock: 50, details: 'Delicious Daal with fresh roti from tandoor' },
    {name: 'Curry / Salan', image_link: 'images/curry.png', id: 4, price: 20, sold:0, stock: 50, details: 'Spicy and delicious curry' },
    {name: 'Beef Steak', image_link: 'images/steak.png', id: 5, price: 50, sold:0, stock: 20, details: 'Fresh and Tender Beef steak' },
    {name: 'burger', image_link: 'images/burger.png', id: 6, price: 25, sold:0, stock: 65, details: 'Delicious double patty beef burger' },
    {name: 'Mix Food Platter', image_link: 'images/mix food.png', id: 7, price: 100, sold:0, stock: 5, details: 'Mix BarBQ served with a platter of Rice' },
    {name: 'Teleteg', image_link: 'images/teleteg.png', id: 8, price: 10, sold:0, stock: 50, details: 'Dine in addon' },
    {name: 'Top Bar 1', image_link: 'images/top bar 1.png', id: 9, price: 12, sold:0, stock: 52, details: 'Nothing to show up' },
    {name: 'Top Bar 2', image_link: 'images/top bar 2.png', id: 10, price: 15, sold:0, stock: 50, details: 'Nothing to show up' },
    {name: 'Top Bar 3', image_link: 'images/top bar 3.png', id: 11, price: 18, sold:0, stock: 55, details: 'Nothing to show up' },
    {name: 'logo', image_link: 'images/121212.jpeg', id: 12, price: 10, sold:0, stock: 50, details: 'Just Kidding' } */

