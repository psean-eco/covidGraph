export const countryDataSubscriptionResolver= payload => {
    if (payload.features) {
      const result = payload.features.map(item => {
        return {
          country: `${item.attributes.Country_Region}`,
          confirmedDeaths: `${item.attributes.Deaths}`,
          confirmedCases: `${item.attributes.Confirmed}`,
          recovered: `${item.attributes.Recovered}`,
        }
      })
      return result
    }
    return []
  }