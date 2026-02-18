import React from "react"
import { useEffect } from "react"
export default function Main(){

    const [meme,setMemeInfo]=React.useState({
        topText:"One does not simply",
        bottomText:"Walk into Mordor",
       
        imgUrl:"http://i.imgflip.com/1bij.jpg"
    }
    
    
    )
    
    const [loading,setLoading]=React.useState(true)
    const [memeArray,setMemeArray]=React.useState([])
    useEffect(()=>{

        fetch("https://api.imgflip.com/get_memes")
        .then(response=>response.json())
        .then(data=>setMemeArray(data.data.memes))
        .then(setLoading(false))
    },[])
    function getMemeImage(){
        const randomIndex=Math.floor(Math.random() * memeArray.length)
        const memeImgUrl=memeArray[randomIndex].url
        
       setMemeInfo(prev=>({
        ...prev,
        imgUrl:memeImgUrl
       }))
       
    }
    function handleClick(event){
        const {name,value}=event.currentTarget
        setMemeInfo(prev=>({
            
            ...prev,
            [name]:value
        
        }))
        
        console.log(meme.topText);
        
    }
    if(loading){return <p>Loading</p>}
    return(
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleClick}  
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleClick}
                        value={meme.bottomText}
                    />
                </label>
                
                <button onClick={getMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imgUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
                
            </div>
        </main>
    )
}