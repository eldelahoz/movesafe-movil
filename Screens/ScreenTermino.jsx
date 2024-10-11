import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import { ArrowLongLeftIcon } from "react-native-heroicons/solid";

const ScreenTermino = ({ navigation }) => {
  const [loaded] = useFonts({
    PlusJakartaSans: require("../assets/fonts/PlusJakartaSans.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.ContainerPrincipal}>
      <View>
        <TouchableOpacity
          style={styles.containerArrow}
          onPress={() => {
            navigation.navigate("ScreenRegister");
          }}
        >
          <ArrowLongLeftIcon style={styles.ArrowLeftIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.ContainerTitulo}>
        <Text style={styles.titulo}>Términos y Condiciones</Text>
      </View>

      <ScrollView style={styles.container}
      showsVerticalScrollIndicator={false}
      >
        <Text style={{ textAlign: "justify" }}>
          La información que se solicita con más frecuencia es la siguiente (los
          requisitos específicos del país se enumeran a continuación): La
          identidad del titular, incluida cualquier condición jurídica
          comercial, si corresponde. Debe ser un nombre legalmente válido, por
          ejemplo, el nombre comercial registrado del titular. Los datos de
          contacto del titular. Por lo general, la dirección de correo
          electrónico, número de teléfono y/o número de fax. La dirección de la
          sede del titular. A esta dirección el consumidor puede, por ejemplo,
          enviar quejas o devolver los productos comprados. Los códigos de
          conducta pertinentes. En los contratos Business-to-Consumer (B2C), el
          proveedor debe indicar los códigos de conducta pertinentes y la
          información sobre cómo estos últimos se pueden consultar
          electrónicamente. Lo mismo ocurre con los contratos
          Business-to-Business (B2B) si existen dichos códigos. Dado que los
          términos y condiciones constituyen un contrato legalmente vinculante,
          es importante proporcionar datos de contacto válidos. También ten en
          cuenta que a menudo, según la ley del consumidor, los clientes deben
          poder comunicarse contigo cuando lo necesiten. Requisitos específicos
          por país Además de lo anterior, existen otras obligaciones a respetar
          si la empresa está ubicada en uno de estos países. Alemania El titular
          también debe indicar (cuando corresponda): Información sobre la
          identidad del director general. Información sobre la identidad de los
          miembros del consejo de administración. Francia El titular también
          debe indicar (cuando corresponda): El estado legal de la empresa. En
          su caso, el número de registro en el registro mercantil o en el
          directorio de puestos de trabajo. Si la empresa está sujeta a la
          aprobación de un organismo público (por ejemplo, para el uso de una
          moneda digital, venta a distancia, servicios financieros, etc.), el
          nombre y la dirección de la autoridad que otorga esta autorización. El
          número NIF-IVA de la empresa (si corresponde). Si la empresa es
          miembro de una profesión regulada, el titular deberá indicar el título
          profesional y el estado en el que fue otorgado, así como el nombre del
          organismo profesional al que está inscrito. Además, la información de
          contacto del titular debe permitir la comunicación directa. Artículo
          19 de la ley n° 2004-575 del 21 de junio de 2004 para “la confiance en
          l’économie numérique”; artículo L.221-5 del Código del Consumo;
          artículo 1127-1 del Código Civil. Italia El titular también debe
          indicar (cuando corresponda): Si la empresa está sujeta a la gestión
          (subsidiaria) de otra empresa. El registro de empresas en el que está
          registrada la empresa y su número de registro. El código fiscal y el
          número de IVA de la empresa. Artículo 7 del Decreto Legislativo
          70/2003, artículos 48-1 y 49 del Código del Consumidor. Reino Unido El
          titular también debe indicar: Número de IVA de la empresa. El Consumer
          Contracts Regulations de 2013, el Data Protection Act de 1998 y el
          Human Rights Act de 1998. España El titular también debe indicar
          (cuando corresponda): Información sobre la inscripción en el Registro
          Mercantil de España o cualquier otro registro público con fines
          publicitarios o relacionados con la adquisición de personalidad
          jurídica. Si está sujeto a la aprobación de un organismo público, el
          nombre de la autoridad u organismo regulador a cargo de la
          supervisión. Si pertenece a una profesión regulada (como un abogado),
          el titular debe indicar el colegio profesional y el número, el título
          académico, el estado en el que ejerce la profesión, las normas
          profesionales aplicables y cómo se puede acceder a ellas. El CIF
          español: Código de Identificación Fiscal. Artículo 10, Ley 34/2002,
          del 11 de julio, de Servicios de la sociedad de la información y de
          comercio electrónico Bélgica El titular también debe indicar (cuando
          corresponda): La identidad de la empresa. El número de “Banque
          Carrefour des Entreprises” (BCE). El BCE es el registro mercantil
          belga. El nombre comercial de la empresa. Volet VI “Pratiques du
          marché et protection du consommateur” del Código Económico Belga, 31
          de mayo de 2014. Estados Unidos La UETA no proporciona una lista de
          verificación de la información requerida para celebrar un contrato, ya
          que los contratos electrónicos son comparables a un contrato escrito.
          La Ley Uniforme de Transacciones Electrónicas es una Ley Uniforme de
          los Estados Unidos, adoptada por 47 estados. Washington, Nueva York e
          Illinois tienen otra legislación similar.
        </Text>
      </ScrollView>
    </View>
  );
};

export default ScreenTermino;

const styles = StyleSheet.create({
  ContainerPrincipal: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 30,
    marginRight: 30,
  },
  container: {
    fontWeight: "bold",
    fontFamily: "PlusJakartaSans",
    flexDirection: "column",
  },
  ContainerTitulo: {
    alignItems: "center",
    paddingBottom: 10,
  },
  titulo: {
    color: "#FF6816",
    fontSize: 24,
    fontWeight: "bold",
  },
  containerArrow: {
    marginTop: 40,
    paddingBottom: 20,
  },
  ArrowLeftIcon: {
    color: "#F9881F",
  },
});
