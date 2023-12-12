import { ridesTypes } from "../dummyData";

export const getRideTypeName = (typeRideKey: string) => {
    const foundType = ridesTypes.find((type) => type.key === typeRideKey);
    return foundType ? foundType.name : "Unknown Type";
  };
  
 export const getRideCategoria = (typeRideKey: string, typeCategoriaKey: string) => {
    const foundType = ridesTypes.find((type) => type.key === typeRideKey);
    if (foundType) {
      const foundCategoria = foundType.categorias.find(
        (categoria) => categoria.key === typeCategoriaKey
      );
      return foundCategoria ? foundCategoria.name : "Unknown Categoria";
    }
    return "Unknown Type";
  };
  
  export const getRideStartPoints = (typeRideKey: string, typeStartPointsKey: string) => {
    const foundType = ridesTypes.find((type) => type.key === typeRideKey);
    if (foundType) {
      const foundStartPoint = foundType.startPoints.find(
        (startPoint) => startPoint.key === typeStartPointsKey
      );
      return foundStartPoint ? foundStartPoint.name : "Unknown Start Point";
    }
    return "Unknown Type";
  };
