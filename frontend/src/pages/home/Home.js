import HomeWrapper, { HomeWrapperMain, HomeWrapperSidebar } from '../../component/home-wrapper/HomeWrapper';
import ProductCard from '../../component/product-card/ProductCard';
import { clearErrors } from '../../redux/actions/productAction';
import './home.scss';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import Loader from '../../component/loader/Loader';
import AlertBox from '../../component/alert-box/AlertBox';
import InfiniteScroll from "react-infinite-scroll-component";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
} from "../../redux/constants/productConstants";
import axios from 'axios';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { loadUser } from '../../redux/actions/userAction';
import { categories } from '../../constants';

function Home() {

  const dispatch = useDispatch();
  const { loading, error, products, productsCount, resultPerPage } = useSelector((state) => state.products);
  const [keyword, setKeyword] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [allProducts, setAllProducts] = useState([])
  const intialPrice = [0, 5000];
  const [price, setPrice] = useState(intialPrice)
  const [category, setCategory] = useState("All")
  const [ratings, setRatings] = useState(0)
  const [priceChanged, setPriceChanged] = useState(intialPrice)
  const priceMinMax = [0, 45000]



  const handleRatings = (event, newRatings) => {
    if(newRatings !== ratings){
      setCurrentPage(1)
      setAllProducts([])
      setRatings(newRatings);
    }
  }
  
  const handleCategory = (e) => {
    setCurrentPage(1)
    setAllProducts([])
    setCategory(e.target.value);
  };
  
  
  const handlePrice = async (event, newPrice) => {
    if(price[0] !== newPrice[0] || price[1] !== newPrice[1]){
      setPrice(newPrice);
    }
  }

  const handleChangePrice = async (event, newPrice) => {
    if(priceChanged[0] !== newPrice[0] || priceChanged[1] !== newPrice[1]){
      setAllProducts([])
      setCurrentPage(1)
      setPriceChanged(newPrice)
    }
  }

  const handleSliderMin = (e) => {
    var currentValue = Number(e.target.value);

    if(currentValue >= priceMinMax[0] && currentValue <= priceMinMax[1]){
      setPrice(oldPrice=> ([currentValue, oldPrice[1]]))
      
      if(priceChanged!==currentValue){
        setPriceChanged(oldPrice=> ([currentValue, oldPrice[1]]))
      }
    }

  }

  const handleSliderMax = (e) => {
    var currentValue = Number(e.target.value);

    if(currentValue >= priceMinMax[0] && currentValue <= priceMinMax[1]){
      setPrice(oldPrice=> ([oldPrice[0], currentValue]))
      
      if(priceChanged!==currentValue){
        setPriceChanged(oldPrice=> ([oldPrice[0], currentValue]))
      }
    }
  }

  const fetchMoreProducts = async () => {
    if ((currentPage+1) <= Math.ceil(productsCount / resultPerPage)) {
      try {
        dispatch({
          type: ALL_PRODUCT_REQUEST
        });

        if(category==="All"){
          var res  = await axios.get(`/api/v1/products?keyword=${keyword.trim()}&page=${currentPage + 1}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`);
        }else{
          res = await axios.get(`/api/v1/products?keyword=${keyword.trim()}&page=${currentPage + 1}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&category=${category}`);
        }

        dispatch({
          type: ALL_PRODUCT_SUCCESS,
          payload: res.data
        })

        setAllProducts(allProducts.concat(res.data.products))
        setCurrentPage(currentPage + 1)

      } catch (error) {
        dispatch({
          type: ALL_PRODUCT_FAIL,
          payload: error.response
        })
      }
    }
  }
  

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    } 
    
    const updateProduct = async () => {
      setCurrentPage(1)
      setAllProducts([])
      dispatch(loadUser())

      try {
        dispatch({
          type: ALL_PRODUCT_REQUEST
        });


        if(category==="All"){
          var res = await axios.get(`/api/v1/products?keyword=${keyword.trim()}&page=1&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`);
        }else{
          res = await axios.get(`/api/v1/products?keyword=${keyword.trim()}&page=1&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&category=${category}`);
        }

        setAllProducts(res.data.products)

        dispatch({
          type: ALL_PRODUCT_SUCCESS,
          payload: res.data
        })

      } catch (error) {
        dispatch({
          type: ALL_PRODUCT_FAIL,
          payload: error.response
        })
      }
    }

    updateProduct()
    // eslint-disable-next-line
  }, [error, dispatch, category, ratings, priceChanged])

  const handleSearch = (e) => {
    setAllProducts([])
    setKeyword(e.target.value)

    const updateProduct = async () => {
      try {
        dispatch({
          type: ALL_PRODUCT_REQUEST
        });

        const { data } = await axios.get(`/api/v1/products?keyword=${e.target.value.trim()}&page=${1}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`);
        setCurrentPage(1)

        setAllProducts(data.products)

        dispatch({
          type: ALL_PRODUCT_SUCCESS,
          payload: data
        })

      } catch (error) {
        dispatch({
          type: ALL_PRODUCT_FAIL,
          payload: error.response
        })
      }
    }

    updateProduct()
  }

  return (
    <>
      {error && <AlertBox type="error" msg={error.statusText} />}
      <div className='home'>
        <HomeWrapper>
          <HomeWrapperSidebar>
            <div className="home__searchbar">
              <input type="text" onChange={handleSearch} placeholder='Type here...' className="home__searchbar__input" />
            </div>
            <div className="split"></div>
            <div className="home__filters">
              <div className="home__filters__heading">Price</div>
              <div className="home__filters__slider">
                <Slider
                  getAriaLabel={() => 'Minimum distance'}
                  value={price}
                  onChange={handlePrice}
                  onChangeCommitted={handleChangePrice}
                  valueLabelDisplay="auto"
                  step={1}
                  min={priceMinMax[0]}
                  max={priceMinMax[1]}
                  disableSwap
                />
                <div className="home__filters__slider__inputs">
                  <div>
                    <label htmlFor="min">Min:</label><input type="number" id="min" value={price[0]} onChange={handleSliderMin}/>
                  </div>
                  <div>
                    <label htmlFor="max">Max:</label><input type="number" id="max" value={price[1]} onChange={handleSliderMax}/>
                  </div>
                </div>
              </div>
              <div className="split"></div>
              <div className="home__filters__heading">Categories</div>
              <div className="home__filters__categories">
                <RadioGroup
                  value={category}
                  onChange={handleCategory}
                >
                {
                  categories.map((categoryItem) => (
                        <FormControlLabel key={categoryItem} value={categoryItem} control={<Radio />} label={categoryItem} />
                  ))
                }
                </RadioGroup>
              </div>
              <div className="split"></div>
              <div className="home__filters__heading">Ratings</div>
              <Slider 
                value={ratings}
                onChange={handleRatings}
                aria-label="Default" 
                valueLabelDisplay="auto"
                step={1}
                min={0}
                max={5}
                disableSwap
              />
            </div>
          </HomeWrapperSidebar>
          <HomeWrapperMain>
            <div className="heading">Product</div>
            <div className="home__main">
              {products.length === 0 && loading && allProducts.length === 0 && <Loader />}
              {products.length === 0 && !loading ? allProducts.length === 0 && (<p className='home__no-result'>Oops... Sorry! no result found</p>) :
                productsCount !== undefined &&
                <InfiniteScroll
                  dataLength={productsCount}
                  next={fetchMoreProducts}
                  hasMore={productsCount !== allProducts.length}
                  loader={<Loader />}
                >
                  {
                    allProducts.map(product => (
                      <ProductCard key={product._id} product={product} />
                    ))
                  }
                </InfiniteScroll>
              }
            </div>
          </HomeWrapperMain>
        </HomeWrapper>
      </div>
    </>
  )
}

export default Home