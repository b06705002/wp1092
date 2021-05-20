import { useState ,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
// import cors from 'cors';
import { useStyles } from '../hooks';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';


const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;
const Row_table = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;

const Body = () => {
  const classes = useStyles();

  const { messagess,deleteMessage , addCardMessage, addRegularMessage, addErrorMessage } =
    useScoreCard();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const [queryType, setQueryType] = useState('name');
  const [queryString, setQueryString] = useState('');

  console.log(addRegularMessage);
  const[Cardlist,setCardList] = useState([]);

  useEffect(()=>{
    axios.get('/api/get-card',{})
    .then((allCards)=>{
      console.log('fff');
      setCardList(allCards.data)
    })
  },[]);
  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleAdd = async () => {
    
    const {
      data: { message, card },
    } = await axios.post('/api/create-card', {
      name,
      subject,
      score,
    });
      // .catch(console.log('fuck'));
    
    if (!card) addErrorMessage(message);
    else addCardMessage(message);
    // deleteMessage();
  };
  const deleteM = async()=>{
    deleteMessage();
  }
  const handleQuery = async () => {
    // deleteMessage();
    // console.log(this.messages);
    const {
      data: { messagess, message },
    } = await axios.post('/api/query-card', {
      queryString,
      queryType
    });


    if (!messagess){
      // console.log('fuck');
      addErrorMessage(message);
    }else{
      addRegularMessage(...messagess);

    }

  };

  return (

    <Wrapper>
      <Row>
        {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
        <TextField
          className={classes.input}
          placeholder="Name"
          value={name}
          onChange={handleChange(setName)}
        />
        <TextField
          className={classes.input}
          placeholder="Subject"
          style={{ width: 240 }}
          value={subject}
          onChange={handleChange(setSubject)}
        />
        <TextField
          className={classes.input}
          placeholder="Score"
          value={score}
          onChange={handleChange(setScore)}
          type="number"
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!name || !subject}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Row>
      <Row>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={queryType}
              onChange={handleChange(setQueryType)}
            >
              <FormControlLabel
                value="name"
                control={<Radio color="primary" />}
                label="Name"
              />
              <FormControlLabel
                value="subject"
                control={<Radio color="primary" />}
                label="Subject"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
        <TextField
          placeholder="Query string..."
          value={queryString}
          onChange={handleChange(setQueryString)}
          style={{ flex: 1 }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!queryString}
          onClick= {deleteM,handleQuery}
        >
          Query
        </Button>
      </Row>
      <ContentPaper variant="outlined">
      {/* <Row_table>
        <TableCell>Name</TableCell>
        <TableCell>Subject</TableCell>
        <TableCell>Name</TableCell>
      </Row_table> */}
        {messagess.map((m, i) => (
        <Typography variant="body2" key={m + i} style={{ color: m.color }}>
          {m.message}
        </Typography>
        ))}
      </ContentPaper>
    </Wrapper>
  );
};

export default Body;

