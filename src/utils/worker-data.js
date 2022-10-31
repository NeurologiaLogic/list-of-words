import Worker from 'simple-web-worker'

let arr = ['a']
let regex_input = null;
const actions=[
  { message: 'add_worker', func: (array,regex_input,input_length)=>{
     const arr = []
      for (let data of array)
        if (data.match(regex_input)&&input_length===data.length)
          arr.push(data)
      return arr
  }},
]

const get_regex = (input)=>{
  let res_input = ""
  for(let key of input)
  {
    if(key==="_")
    {
      res_input+='[a-z]'
    }
    else res_input+=key
  }
  return res_input;
}
const worker = Worker.create(actions)

export const GetResult = async (input,word_list) => {
  arr=[]
  regex_input = get_regex(input.toLowerCase())
  const MAX_LENGTH_PER_BATCH = 3000
  const Max_LENGTH = 28032
  const num_workers = Max_LENGTH / MAX_LENGTH_PER_BATCH
  let word_list_as_list = Object.keys(word_list)
  for (let i = 0; i < num_workers; i++) {
    const words = await word_list_as_list.splice(0,3000)
    const new_data=await worker.postMessage('add_worker',[words,regex_input,input.length])
    .catch(err => {
      console.error(err)
    })
    arr.push(...new_data)
  }
  return arr
}
