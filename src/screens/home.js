import React, { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { GlobalContext } from "../context/context";
import { db , collection , addDoc , getDocs , doc , setDoc , getDoc  } from "../configs/firebase";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import Logout from "../components/logout";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  let {state , dispatch} = useContext(GlobalContext);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  let [tweetPostInp , setTweetPostInp] = useState('')

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  async function postingBtn(){
      try {
        let dataRef1 = collection(db , 'allTweets' );
        await addDoc(dataRef1,{
            tweet : tweetPostInp,
            uid : state.authUser.uid,
            username : state.authUser.username
        });
        let dataRef2 = collection(db , 'users' , state.authUser.uid , 'myTweets');
        await addDoc(dataRef2,{
            tweet : tweetPostInp,
            uid : state.authUser.uid,
            username : state.authUser.username
        });
      } catch (error) {
          console.log(error)
      }
      setTweetPostInp('')
  }

  useEffect(async function(){
      let dataRef = collection(db ,  'allTweets'  )
      let dataInfo = await getDocs(dataRef)
      dataInfo.forEach(function(doc ){
          dispatch({type : 'ALL_TWEETS' , payload : doc})
          
      })
  },[])
  
  useEffect(async function(){
    let uid = localStorage.getItem('authUid')
    let dataRef = collection(db , 'users' ,  uid ,  'myTweets'  )
    let dataInfo = await getDocs(dataRef)
    dataInfo.forEach(function(doc ){
        dispatch({type : 'MY_TWEETS' , payload : doc})
        
    })
},[])

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  async function likeBtn(e){
    
      let tweetId = e.parentNode.parentNode.parentNode.id;
    
      try {
        let ref = doc(db , 'allTweets' , tweetId , 'reactions' , state.authUser.uid);
        let tweetCompare = await getDoc(ref);
        if(tweetCompare.data().dislike === null){
            let dataRef = doc(db , 'allTweets' , tweetId , 'reactions' , state.authUser.uid);
              await setDoc(dataRef,{
                like : 1,
                dislike : null,
                userReact : tweetId
              })
        }else{
         let dataRef = doc(db , 'allTweets' , tweetId , 'reactions' , state.authUser.uid);
              await setDoc(dataRef,{
                like : 1,
                dislike : null,
                userReact : tweetId
              })
        }
      } catch (error) {
        console.log(error)
        let dataRef = doc(db , 'allTweets' , tweetId , 'reactions' , state.authUser.uid);
              await setDoc(dataRef,{
                like : 1,
                dislike : null,
                userReact : tweetId
              })
      }
     
  }
  async function dislikeBtn(e){
    
    let tweetId =  e.parentNode.parentNode.parentNode.id;
    
    try {
      let ref = doc(db , 'allTweets' , tweetId , 'reactions' , state.authUser.uid);
    let tweetCompare = await getDoc(ref);
      if(tweetCompare.data().like){
        let dataRef = doc(db , 'allTweets' , tweetId , 'reactions' , state.authUser.uid)
          await setDoc(dataRef,{
            like : null,
            dislike : 1,
            userReact : tweetId
          })
      }else{
        let dataRef = doc(db , 'allTweets' , tweetId , 'reactions' , state.authUser.uid)
        await setDoc(dataRef,{
          dislike : 1,
          like : null,
          userReact : tweetId
        })
      }
    } catch (error) {
      console.log(error)
      let dataRef = doc(db , 'allTweets' , tweetId , 'reactions' , state.authUser.uid)
      await setDoc(dataRef,{
        dislike : 1,
        like : null,
        userReact : tweetId
      })
    }
    //
}

useEffect(async function(){
    let dataRef = collection(db ,  'allTweets'  )
    let dataInfo = await getDocs(dataRef)
    dataInfo.forEach(async function(doc ){
        
        let ref = collection(db , 'allTweets' , doc.id , 'reactions' )
        let dataInfo = await getDocs(ref)
        dataInfo.forEach(function(info){
            dispatch({type : 'REACTIONS' , payload : info})

        })
        
    })
},[])


  return (
    <Box sx={{ bgcolor: 'background.paper', width: 500  , margin : '0 auto'}} >
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          style={{textAlign : 'center'}}
        >
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="My Tweets" {...a11yProps(1)} />
          <Tab label="Profile" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          
        <TextareaAutosize
            aria-label="minimum height"
            minRows={5}
            placeholder = "Type Here"
            style={{ width: 450 , maxWidth : 450 }}
            value={tweetPostInp}
            onChange={(e)=>{setTweetPostInp(e.target.value)}}
        />
        <Button onClick={postingBtn} style={{position : "relative" , left : 392}}  variant="contained" endIcon={<SendIcon />}></Button>
    



        {
            state.allTweets.map(function(doc, index){
                return(
                    <div id ={doc.id}>
         <Card sx={{ minWidth: 275 }} id ={doc.id}>
      <CardContent >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {doc.data().username}
        </Typography>
        <Typography variant="h5" component="div">
        {doc.data().username}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Tweet 
        </Typography>
        <Typography variant="body2">
          {doc.data().tweet}
        </Typography>
       
      </CardContent>
      <Typography variant="body2" style={{position : 'relative' , left:25}}>
        {
             state.reactions.map(function(react){
               if(react.data().userReact === doc.id ){
                 return (
                   <>
                   <span>{react.data().like}</span>
                   <span style={{position : 'relative' , left : 70}}>{react.data().dislike}</span>
                   </>
                 )
               }
             })
        }
          {/* 10 */}
        </Typography>
      <CardActions>
    
        <Button  onClick={(e)=>{likeBtn(e.target)}} size="small" variant="contained"  >Like</Button>
        <Button  onClick={(e)=>{dislikeBtn(e.target)}} size="small" variant="contained"  >Dislike</Button>
      </CardActions>
    </Card>
    <br />
                    </div>
                )
            })
        }
      
    




          
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          

        {
            state.myTweets.map(function(doc, index){
                return(
                    <div>
         <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {doc.data().username}
        </Typography>
        <Typography variant="h5" component="div">
        {doc.data().username}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Tweet 
        </Typography>
        <Typography variant="body2">
          {doc.data().tweet}
        </Typography>
      </CardContent>
      <CardActions>

      </CardActions>
    </Card>
    <br />
                    </div>
                )
            })
        }
      
  



        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        
        <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize:17 }} color="text.secondary" gutterBottom>
          Profile Details
        </Typography>
       
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Username : {state.authUser.username}
        </Typography>
        <Typography variant="h5" component="div">
        
          Email : {state.currentUser.email}
        </Typography>
        <Typography variant="body2">
         
        </Typography>
      </CardContent>
      <CardActions>
    
    <Logout />
   
  </CardActions>
    </Card>

        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
