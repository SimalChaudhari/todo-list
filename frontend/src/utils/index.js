
export const convertMonthlyData = (donordata, howsdata) => {
  // create data table for  months 
  
  let data = [];
  const year  =  new Date().getFullYear();

  let months = [`January ${year}`, `February ${year}`, `March ${year}`, `April ${year}`, `May ${year}`, `June ${year}`, `July ${year}`, `August ${year}`, `September ${year}`, `October ${year}`, `November ${year}`, `December ${year}` ];
  
  let curmonth = new Date().getMonth();
  // prepare data array till current  month 
  for (let i = 0; i <= curmonth; i++) {

    data.push({ donor: 0, how: 0, no: i + 1, month: months[i] });
  }
  for (let j = 0; j <= curmonth; j++) {
    // if the data for currunt month is exist in data from server so update in data array 
    
    for (let k = 0; k < donordata.length; k++) {
      if (parseInt(donordata[k].createdAt_month) === data[j].no) {
        

        data[j].donor = donordata[k].count;
      }
    }

    // if the data for currunt month is exist in hows data then 
    for (let l = 0; l < howsdata.length; l++) {
      if (parseInt(howsdata[l].createdAt_month) === data[j].no) {
        data[j].how = howsdata[l].count;
      }

    }
    

  }
  
  return data;
}



export const  months  = [`January `, `February `, `March `, `April `, `May `, `June `, `July `, `August `, `September `, `October `, `November `, `December `]


export const years = [
 '2009',
  '2010',
  '2011',
  '2012',
  '2013',
  '2014', 
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2022'
  
]

export const Donationamount  = [{
  name: 'Donor',
  type: 'line',
  data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
},
{
  name: 'How',
  type: 'line',
  data: [40, 501, 400, 67, 270, 43, 201, 302, 702, 20, 25, 16]
}
];

function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}



export const convertMonthData = (data, month)=>{
  const  final  = {
    xaxies  : [],
    yaxies : []
  }
  const year  = new Date().getFullYear();
  const curdate  = new Date().getDate();
  for(let i =1 ;i<= curdate;i++ ){
    let flag = false;
    for(let j  =0 ;j< data.length ;j++){
      if(data[j].createdAt_date  ===i){
        flag  = true ;
        final.xaxies.push(`${i}/${month}/${year}`);
        final.yaxies.push(data[j].count);
        
      }
    }
    if(flag === false){
      final.xaxies.push(`${i}/${month}/${year}`);
      final.yaxies.push(0)
    }
     
  }

  return final;

}

export const convertyearData  = (data)=>{
  const  final  = {
    xaxies  : [],
    yaxies : []
  }
  const year  = new Date().getFullYear();
  for(let i =2020 ;i<= year;i++ ){
    let flag = false;
    for(let j  =0 ;j< data.length ;j++){
      if(data[j].createdAt_year  ===i){
        flag  = true ;
        final.xaxies.push(`${i}`);
        final.yaxies.push(data[j].count);
        
      }
    }
    if(flag === false){
      final.xaxies.push(`${i}`);
      final.yaxies.push(0)
    }
     
  }

  return final; 
  
  
}
export const convertmonthData  = (data, year )=>{
  const  final  = {
    xaxies  : [],
    yaxies : []
  }
  for(let i =1 ;i<= 12;i++ ){
    let flag = false;
    for(let j  =0 ;j< data.length ;j++){
      if(data[j].createdAt_month  ===i){
        flag  = true ;
        final.xaxies.push(`${i}/${year}`);
        final.yaxies.push(data[j].count);
        
      }
    }
    if(flag === false){
      final.xaxies.push(`${i}/${year}`);
      final.yaxies.push(0)
    }
  }
  return final;
}
export const amount  = [{
  name: 'Amount',
  type: 'line',
  data: [440, 505, 414, 617, 27, 413, 201, 352, 752, 320, 257, 160]
}
];
