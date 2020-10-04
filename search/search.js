import { Button, Card, CardContent, CardHeader, CardMedia, FormControl, Grid, Select, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ApiService from '../Services/pet.service';

class Search extends Component{
    constructor(props){
        super(props)
        this.state = {
            message: null,
            pets:[],
            clinic:[],
            food:[],
            filter:[],
            category:[]
        }
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeCategory1 = this.handleChangeCategory1.bind(this);
    }


    handleChangeSearch = (event) => {
        const searchText = event.target.value;
        this.setState({searchText});
        console.log(this.state.searchText);
    }

    handleChangeCategory1 = (event)=>{
        console.log(event.target.value)
        const category = event.target.value;
        this.setState({category});
        console.log(this.state.category)
    }

    handleChangeCategory = () =>{
        let endpoint;
        let href;
        let search = null;
        if(this.state.category=='pets' && this.state.searchText==search){
            endpoint = 'http://localhost:8080/api/pets';
            href= '/AvailableList'

        }else if (this.state.category=='pets' && this.state.searchText=='dog'){
            endpoint = 'http://localhost:8080/api/pets?search=dog';
            href = '/dog'

        }else if (this.state.category=='pets' && this.state.searchText=='parrot'){
            endpoint = 'http://localhost:8080/api/pets?search=parrot';
            href = '/parrots'

        }else if (this.state.category=='pets' && this.state.searchText=='cat'){
            endpoint = 'http://localhost:8080/api/pets?search=parrot';
            href = '/cat'

        }else if (this.state.category=='clinic'){
            endpoint = 'http://localhost:8080/api/clinic'
        }

        
        ApiService.filter(endpoint,href)
            .then((res) =>{
                this.setState({filter:res.data})
                this.setState({href})
                console.log(this.state.filter);
                console.log(this.state.href);
                console.log(this.state.category)
            });


    }
    

    render(){
        return(
            <>
            <div>
      <FormControl fullWidth variant="outlined">
        <div>
      <TextField onChange={this.handleChangeSearch} style={{width:"60%",backgroundColor:'#eeeeee'}} variant="outlined"></TextField>
        <Select
        style={{backgroundColor:'#eeeeee'}}
        native
        onClick={this.handleChangeCategory1}
        >
            <option value={'All'}>All</option>
            <option value={'pets'}>Pets</option>
            <option value={'clinic'}>Clinic</option>
            <option value={'food'}>Food</option>
        </Select>
      <Button href={this.state.href} onMouseOver={this.handleChangeCategory}  style={{backgroundColor:'#eeeeee'}}>
      <SearchIcon style={{fontSize:'300%'}}/>
      </Button>
      </div>
      </FormControl>
    </div>
            </>
        )
    }
}
export default Search;