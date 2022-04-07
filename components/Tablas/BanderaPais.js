import { Badge, Image, VStack } from "@chakra-ui/react";

export const BanderaPais = ({ bandera, nombre }) => {
  //console.log(bandera, nombre);
  return (
    <VStack>
      <Image
        style={{ border: "1px lightgrey solid" }}
        src={`./banderas/${bandera.toLowerCase()}.png`}
        alt={nombre}
        borderRadius="full"
        height={45}
        width={45}
      />
      <Badge>{nombre}</Badge>
    </VStack>
  );
};
/* 

style={{
                        width: cell.column.width,
                        padding: "10px",
                        borderStyle: "solid",
                        borderWidth: "0px",
                        borderColor:
                          power > 3320
                            ? "#a9dfbf"
                            : power > 3178
                            ? "#FCF3CF"
                            : power > 3036
                            ? "#c39bd3"
                            : "#d98880",
                      }}

*/
