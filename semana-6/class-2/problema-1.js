function findFirstRepeated(gifts) {
    const vowelsRegex = /[0-9]/g;
    const cleanNumbers = new Set(gifts);
    
    if(gifts.length === cleanNumbers.size) return -1;
    
    const result={};
    
    gifts.forEach((gift, index)=>{
        if(result[gift]){
          result[gift]-=index;
        }else{
          result[gift]=index;
        }
    })
      // if(gifts.includes(cleanNumber)){
      //   if(!result[cleanNumber]){
      //     result[cleanNumber]=index
      //     }else{
      //     result[cleanNumber]+=1;
      //   }
      // }
    
    return Object.values(result);
    
  }
  
  const giftIds = [2, 1, 3, 5, 3, 2]
  const firstRepeatedId = findFirstRepeated(giftIds)
  console.log(firstRepeatedId)