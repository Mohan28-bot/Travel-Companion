import Card from "../common/Card";

function Home() {
  return (
    <div className="App">
      <div className="hdbr">
        <div className="container">
          <p>
            <span id="intro">Welcome</span> to <b id="intro1">Travel World</b>
          </p>
        </div>
        <p id="intro_p">
          Travel World revolutionizes the way people explore the world by
          offering a holistic travel solution that addresses every aspect of
          trip planning and execution.
        </p>
        <a href="#" id="a1">
          Learn More &#8599;
        </a>
        <div className="bts">
          <a href="/login" id="login_bt">
            Login
          </a>
          <a href="/signup" id="signup_bt">
            Signup
          </a>
        </div>
        <div className="seeMore">
          <p>See More &#11015;</p>
        </div>
      </div>
      <h2>Famous Places in India</h2>
      <div className="cards_con">
        <Card
          imageUrl="https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2023/11/27152004/sikkim-joydeep-mitra-shutterstock.jpeg?tr=w-1920"
          title="Sikkim"
          description="Sikkim is the best place to visit in India, a distinction acknowledged by its inclusion by National Geographic"
          link="https://www.holidify.com/state/sikkim/top-destinations-places-to-visit.html"
        />
        <Card
          imageUrl="https://www.holidify.com/images/cmsuploads/compressed/attr_1448_20190212100722jpg"
          title="Taj Mahal"
          description="One of the seven wonders of the world, Taj Mahal is located on the banks of River Yamuna in Agra."
          link="https://www.holidify.com/places/agra/taj-mahal-sightseeing-1020.html"
        />
        <Card
          imageUrl="https://www.holidify.com/images/bgImages/DELHI.jpg"
          title="Indian Gate"
          description="India Gate is a war memorial located in New Delhi, along the Rajpath. It is dedicated to the 82,000 soldiers"
          link="https://www.holidify.com/places/delhi/sightseeing-and-things-to-do.html"
        />
        <Card
          imageUrl="https://www.holidify.com/images/bgImages/HYDERABAD.jpg"
          title="Hyderabad"
          description="A city of contrasts, Hyderabad exudes an old-world charm of its own with the Old City (Charminar side), Hitech City (Cyberabad)"
          link="https://www.holidify.com/places/hyderabad/"
        />
        <Card
          imageUrl="https://www.holidify.com/images/compressed/dest_pixa_9255.jpg"
          title="Hampi"
          description="The most impressive structure in Hampi, the Vithala Temple dates back to the 16th century "
          link="https://www.holidify.com/places/hampi/sightseeing-and-things-to-do.html"
        />
        <Card
          imageUrl="https://www.holidify.com/images/cmsuploads/compressed/shutterstock_479585620_20191024174904_20200407155734.jpg"
          title="Golden Temple"
          description="One of the most spiritual places in India, the Golden Temple, also known as Sri Harmandir Sahib, is the holiest shrine in all of Sikhism"
          link="https://www.holidify.com/places/amritsar/golden-temple-sightseeing-1173.html"
        />
        <Card
          imageUrl="https://www.holidify.com/images/bgImages/GOA.jpg"
          title="Goa"
          description="Goa is India's smallest state and unlike any other, known for its endless beaches, stellar nightlife, eclectic seafood, world-heritage"
          link="https://www.holidify.com/places/goa/"
        />
        <Card
          imageUrl="https://www.holidify.com/images/bgImages/ODISHA.jpg"
          title="Odisha"
          description="Bhubaneswar, the temple city of India, once known for its architecture and grand temples"
          link="https://www.holidify.com/state/odisha/top-destinations-places-to-visit.html"
        />
        <Card
          imageUrl="https://www.holidify.com/images/bgImages/KERALA.jpg"
          title="Kerala"
          description="Famous for the tea estates, greenery, winding roads, blanket of mist, and viewpoints, Munnar is a hill station in Kerala"
          link="https://www.holidify.com/state/kerala/top-destinations-places-to-visit.html"
        />
        <Card
          imageUrl="https://www.holidify.com/images/bgImages/OOTY.jpg"
          title="Ooty"
          description="Nilgiri Mountain Railway, also known as Toy Train in Ooty, is one of the key attractions of the popular hill station Ooty."
          link="https://www.holidify.com/places/ooty/sightseeing-and-things-to-do.html"
        />
        <Card
          imageUrl="https://www.holidify.com/images/bgImages/JOG-FALLS.jpg"
          title="Jog Falls"
          description="The second-highest plunge waterfall in India, Jog Falls is a major tourist attraction in Karnataka and is the highest waterfall in the state"
          link="https://www.holidify.com/places/jog-falls/"
        />
        <Card
          imageUrl="https://www.holidify.com/images/bgImages/GULMARG.jpg"
          title="Himalayas"
          description="Situated at an altitude of 2730 m above sea level, Gulmarg is a popular skiing destination located in Pir Panjal Range of Union territory of Jammu and Kashmir."
          link="https://www.holidify.com/places/gulmarg/"
        />
      </div>
    </div>
  );
}

export default Home;
