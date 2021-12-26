const extractResponses = (res) => {
  const response = {}
  res.map((e)=>{
    if(e.userData){
      if(e.type === "checkbox-group"){
        e.values.forEach( v => {
          if(e.userData.indexOf(v.value)>-1){
            response[e.label.concat( `-${v.label}`)] = true;
          } else {
            response[e.label.concat( `-${v.label}`)] = false;
          }
        });
      } else if(e.type === "select" || e.type === "radio-group"){
        e.values.forEach( v => {
          if(e.userData.indexOf(v.value)>-1){
            response[e.label] = v.label;
            return;
          }
        });
      } else if(e.type === "autocomplete") {
        let found = false;
        e.values.forEach( v => {
          if(e.userData.indexOf(v.value)>-1){
            response[e.label] = v.label;
            found = true;
            return
          }
        });
        if(!found){
          response[e.label] = e.userData[0];
        }
      } else {
        response[e.label] = e.userData[0];
      }
    }
  })
  return response;
}
export default extractResponses;


