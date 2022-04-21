import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCiudades, getCiudad } from "../store/slices/Ciudades";
import { getFilters } from "../store/slices/Filters";
import Filters from "./filters/Filters";
//importaciones para la grafica
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
//importaciones para el pdf
import html2canvas from "html2canvas";
import jsPDF from "jspdf"; 

// declaramos CharsJS para usarlo en la grafica
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
 
export const Home = () => {

  // declaramos la funcion para generar el pdf
  const generatePdf = (e) => {
     e.preventDefault();
     html2canvas(document.querySelector("#grafica")).then((canvas) => {
       const imgData = canvas.toDataURL("image/png");
       const pdf = new jsPDF("p", "pt", "a4", true);
       pdf.addImage(imgData, "PNG", 5, 5, 590, 800);
       pdf.save("grafica.pdf");
     });   
  }; 
  
  /* const generateImg = async (e) => {
    e.preventDefault();
    html2canvas(document.querySelector("#grafica"), {
      onrendered: (canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const img = new Image();
        img.src = imgData;
        img.save("grafica.png");
    }
    });
  }; */
  // declaramos el dispatch para usar en el componente
  const dispatch = useDispatch();

  // declaramos las options que necesita la grafica
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'daystore',
      },
    },
  };
      // llamamos a la funcion para obtener las ciudades
      useEffect(() => {
        dispatch(getAllCiudades());
        dispatch(getFilters());
      }, [dispatch]);
      // estados globales (solo es uno pero de ahi se obtienen los datos para la grafica) y el otro es para el select del filtro
      const { data } = useSelector((state) => state.Ciudades);
      const {filter} = useSelector((state) => state.Filters);
      const ciudades = data?.map((ciudad) => ciudad.Ciudades);
      const servicios = data?.map((ciudad) => ciudad.Numero_de_servicios_diarios);
      const meta = data?.map((ciudad) => ciudad.Meta_para_la_ciudad);

      // datos para grafica
      const labels = ciudades
  
      const datas= {
        labels,
        datasets: [
          {
            label:'Numero de servicios diarios',
            data: servicios,
            backgroundColor: 'rgba(230,225,20,0.5)',
          },
          {
            label:'Meta para la ciudad',
            data: meta,
            backgroundColor: 'rgba(58, 162, 250, 0.2)'
          }
        ]
      }
      
      // declaramos la funcion para obtener la ciudad seleccionada
      const handleChange = (e) => {
        e.preventDefault(); 
        dispatch(getCiudad(e.target.value));
      };

  return (
    <div>
      <div style={{ width: "80%" }} id="grafica">
        <Bar data={datas} options={options} />
      </div>
      <button onClick={generatePdf}>Generar PDF</button>
      {/* <button onClick={generateImg}>Generar Imagen</button> */}
      <Filters data={filter} handleChange={handleChange} dispatch={dispatch} getAllCiudades={getAllCiudades}/>
    </div>
  );
};
