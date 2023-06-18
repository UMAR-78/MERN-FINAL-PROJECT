// In this file we will handle search, filter,
// make a class
class ApiFeatures {
  constructor(
    query,
    queryStr /* ye jo productController sy arha wo is mn ayga query hoge find() or querystr hoga keyword */
  ) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr
      .keyword /* is say hmary pass keyword tou agya ha  */
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i" /*this is for case senstitive search*/,
          },
        }
      : {};

    // console.log(keyword)
    /* this.query means Product.find() */
    this.query = this.query.find({
      ...keyword,    /*In this code, ...keyword spreads the properties of the keyword object into a new object. By using this approach, you can add additional properties to the query object if needed, while preserving the original properties of the keyword object.*/
    }); /*same method whi ha jesa productControoler mn ha*/
    return this; /*  yhi class wapis sy return */
  }


  filter()
  {
    const copyquery = {...this.queryStr}   /* ye 3 dot property ko change krny k lye */

    // console.log(copyquery)
    // During filter hum sirf categoy k hisab sy filter kryn gy lkn queryStr mn keyword b ha islye keyword ko remove krna or 
    // pagination k lye page b use kryn so page ko b remove krna ha

    const removeFields = ["keyword" , "page" , "limit"];

    removeFields.forEach((key) => delete  copyquery[key])
    // console.log(copyquery)

    //  Filter for Price and Ratings   
    // First of all we need to convert object(copyquery) into string
    

    let queryString = JSON.stringify(copyquery) 
    // we need to convert regular expression into dollarsign with expression For expample gt to $gt
    queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g , (key) => `$${key}`)

    this.query = this.query.find(JSON.parse(queryString))
        return this;                                   /* this.query means Product.find() */
  }

  pagination(resultperpage)
  {
        const currentPage = Number(this.queryStr.page) || 1 ; /* this.queryStr.page isko Number mn islye kyu k yeh string thi   or current page is lye 1 ku k agar agy koi product nai tou page 1 he show ga bs*/
        

        /*For exmple hum ny resultperpage 10 product show krany hyn to next page pr jany k lye kitny skip krny hyn uska logic ha yeh
        k For example i am on 1st page so 10 * (1-1) = 0 tou 0 product skip krni ha
        and if we are on 2nd page so 10 * (2-1) = 10 skip krni or 11 sy dikhana
        and if we are on 3rd page so 10 * (3-1) = 20 skip krni or 21 sy shuru krna*/

        const skip = resultperpage * (currentPage -1)

        this.query = this.query.limit(resultperpage).skip(skip)

        return this;
  }

}

module.exports = ApiFeatures;
