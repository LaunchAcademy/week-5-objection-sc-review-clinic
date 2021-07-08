const convertDataTypesForModel = (data, model) => {
  if (model === "Musician") {
    if (data.releasedEPs) {
      const parsedEPs = parseInt(data.releasedEPs)
      return { ...data, releasedEPs: parsedEPs }
    }
  }
}

export default convertDataTypesForModel