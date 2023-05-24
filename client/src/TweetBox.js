import React, { useState , useEffect } from "react";
import "./TweetBox.css";
import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from './avatar';
import { Button } from "@material-ui/core";
import axios from 'axios';
import { TwitterContractAddress } from './config.js';
import {ethers} from 'ethers';
import Twitter from './utils/TwitterContract.json';

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const [avatarOptions, setAvatarOptions] = useState("");
  const [url,setURL] = useState(null);
  const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;
  const addTweet = async () => {
    let tweet = {
      'tweetText': tweetMessage,
      'isDeleted': false
    };
    console.log(tweet);
    try {
      const {ethereum} = window

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter,
          signer
        )
        console.log(TwitterContract);
        if(url)
        {
            let twitterTx = await TwitterContract.addTweet(tweet.tweetText,url,tweet.isDeleted);
            console.log(twitterTx);
        }
        else{
          window.alert("Wait for image to upload on IPFS");
        }
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch(error) {
      console.log("Error submitting new Tweet", error);
    }
  }

  const sendFiletoIPFS = async(e)=>{
    e.preventDefault();
    if (tweetImage) {
      try {

          const formData = new FormData();
          formData.append("file", tweetImage);
          console.log(tweetImage);
          console.log(key, secret);
          const resFile = await axios({
              method: "post",
              url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
              data: formData,
              headers: {
                  'pinata_api_key': key,
                  'pinata_secret_api_key': secret,
                  "Content-Type": "multipart/form-data"
              },
          });

          const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
          console.log(ImgHash); 
          setURL(ImgHash);
//Take a look at your Pinata Pinned section, you will see a new file added to you list.   

      } catch (error) {
          console.log("Error sending File to IPFS: ")
          console.log(error)
      }
  }else{
    console.log("No Image");
  }
}

const getImageHash=async (e)=>{
  e.preventDefault();
  setTweetImage(e.target.files[0]);
  console.log(tweetImage);
}

  const sendTweet = (e) => {
    e.preventDefault();

    addTweet();

    setTweetMessage("");
    setTweetImage("");
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    let avatar = generateRandomAvatarOptions();
    setAvatarOptions(avatar);
  }, []);

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar
            style={{ width: '100px', height: '100px' }}
            avatarStyle='Circle'
            {...avatarOptions }
          />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />
          <input
          onChange={getImageHash}
          className="tweetBox__imageInput"
          placeholder="Optional: Select Image"
          type="file"
          required
        />
        <button id="ImageHash" onClick={sendFiletoIPFS} >
        Get IPFS Hash
        </button>
        </div>
        
        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
