const formatMultiSearchQuery = (data) => {
    let query = {
        addressName: data.addressName,
        type: data.type,
        minPrice: data.priceRate.min,
        maxPrice: data.priceRate.max,
        sex: data.numPeople.sex,
        peoples: data.numPeople.num,
    };

}