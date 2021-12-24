const extractResponses = (res) => {
  const response = {}
  res.map((e)=>{
    if(e.userData){
      response[e.label] = e.userData;
    }
  })
  return response;
}
export default extractResponses;