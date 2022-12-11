const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

/** START GET FOR INPUTS */
app.get("/getUsernames", (req, res) => {
  db.query("SELECT username, concat(first_name, ' ', last_name, ' (', username, ')') as name FROM users", (err, result) => {
    if (err) {
      res.header('Access-Control-Allow-Origin', '*');
      res.json({ message: "Get Error" });
    }  

    const usernames = [];
    for (let i = 0; i < result.length; i++) {
      usernames.push({'username': result[i]["username"], 'name': result[i]["name"]});
    }
    res.header('Access-Control-Allow-Origin', '*');
    res.json(usernames);
  });
});

app.get("/getRestaurants", (req, res) => {
  db.query("SELECT long_name FROM restaurants", (err, result) => {
    if (err) {
      res.header('Access-Control-Allow-Origin', '*');
      res.json({ message: "Get Error" });
    }  

    const restaurants = [];
    for (let i = 0; i < result.length; i++) {
      restaurants.push(result[i]["long_name"]);
    }
    res.header('Access-Control-Allow-Origin', '*');
    res.json(restaurants);
  });
});

app.get("/getServices", (req, res) => {
  db.query("SELECT id, long_name FROM delivery_services", (err, result) => {
    if (err) {
      res.header('Access-Control-Allow-Origin', '*');
      res.json({ message: "Get Error" });
    }  

    const services = [];
    for (let i = 0; i < result.length; i++) {
      services.push({'id': result[i]["id"], 'long_name': result[i]["long_name"]});
    }
    res.header('Access-Control-Allow-Origin', '*');
    res.json(services);
  });
});

app.post("/getDronesById", (req, res) => {
  db.query("SELECT * FROM drones WHERE id = ?", [req.body.ip_id], (err, result) => {
    if (err) {
      res.header('Access-Control-Allow-Origin', '*');
      res.json({ message: "Get Error" });
    }  

    res.header('Access-Control-Allow-Origin', '*');
    res.json(result);
  });
});
/** END GET FOR INPUTS */

app.post("/add_owner", (req, res) => {
  const ip_username = req.body.ip_username;
  const ip_first_name = req.body.ip_first_name;
  const ip_last_name = req.body.ip_last_name;
  const ip_address = req.body.ip_address;
  const ip_birthdate = req.body.ip_birthdate; /** @TODO ERROR. NEEDS NORMALIZATION */
   
  db.query(`call add_owner(?,?,?,?,?)`,
    [ip_username, ip_first_name, ip_last_name, ip_address, ip_birthdate],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Error detected")
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/add_owner", (req, res) => {
  db.query("SELECT * FROM restaurant_owners", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result);
  });
});

app.post("/add_employee", (req, res) => {
  const ip_username = req.body.ip_username;
  const ip_first_name = req.body.ip_first_name;
  const ip_last_name = req.body.ip_last_name;
  const ip_address = req.body.ip_address;
  const ip_birthdate = req.body.ip_birthdate; /** @TODO FIX */
  const ip_taxID = req.body.ip_taxID;
  const ip_hired = req.body.ip_hired;
  const ip_employee_experience = parseInt(req.body.ip_employee_experience);
  const ip_salary = parseInt(req.body.ip_salary);
   
  db.query(`call add_employee(?,?,?,?,?)`,
    [ip_username, ip_first_name, ip_last_name, ip_address, ip_birthdate, ip_taxID, ip_hired, ip_employee_experience, ip_salary],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Error detected")
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/add_employee", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result); 
  });
});

app.post("/add_pilot_role", (req, res) => {
  const ip_username = req.body.ip_username;
  const ip_licenseID = req.body.ip_licenseID;
  const ip_pilot_experience = parseInt(req.body.ip_pilot_experience);
   
  db.query(`call add_pilot_role(?,?,?)`,
    [ip_username, ip_licenseID, ip_pilot_experience],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/pilot", (req, res) => {
  db.query("SELECT * FROM pilots", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.header('Access-Control-Allow-Origin', '*');
    res.json(result);
  });
});

app.post("/add_worker_role", (req, res) => {
  const ip_username = req.body.ip_username;

  db.query(`call add_worker_role(?)`, [ip_username],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/add_worker_role", (req, res) => {
  db.query("SELECT * FROM workers", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result);
  });
});

app.post("/add_ingredient", (req, res) => {
  const ip_barcode = req.body.ip_barcode;
  const ip_iname = req.body.ip_iname;
  const ip_weight = parseInt(req.body.ip_weight);

  db.query(`call add_ingredient(?,?,?)`, [ip_barcode, ip_iname, ip_weight],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/add_ingredient", (req, res) => {
  db.query("SELECT * FROM ingredients", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result);
  });
});

app.post("/add_drone", (req, res) => {
  const ip_id = req.body.ip_id;
  const ip_tag = req.body.ip_tag;
  const ip_fuel = parseInt(req.body.ip_fuel);
  const ip_capacity = parseInt(req.body.ip_capacity);
  const ip_sales = parseInt(req.body.ip_sales);
  const ip_flown_by = req.body.ip_flown_by;

  db.query(`call add_drone(?,?,?,?,?,?)`, [ip_id, ip_tag, ip_fuel, ip_capacity, ip_sales, ip_flown_by],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/add_drone", (req, res) => {
  db.query("SELECT * FROM drones", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result);
  });
});

app.post("/add_restaurant", (req, res) => {
  const ip_long_name = req.body.ip_long_name;
  const ip_rating = parseInt(req.body.ip_rating);
  const ip_spent = parseInt(req.body.ip_spent);
  const ip_location = req.body.ip_location;

  db.query(`call add_restaurant(?,?,?,?)`, [ip_long_name, ip_rating, ip_spent, ip_location ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/add_restaurant", (req, res) => {
  db.query("SELECT * FROM restaurants", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result);
  });
});

app.post("/add_service", (req, res) => {
  const ip_id = req.body.ip_id;
  const ip_long_name = req.body.ip_long_name;
  const ip_home_base = req.body.ip_home_base;
  const ip_manager = req.body.ip_manager;

  db.query(`call add_service(?,?,?,?)`, [ip_id, ip_long_name, ip_home_base, ip_manager],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/add_service", (req, res) => {
  db.query("SELECT * FROM delivery_services", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result);  
  });
});

app.post("/add_location", (req, res) => {
  const ip_label = req.body.ip_label;
  const ip_x_coord = parseInt(req.body.ip_x_coord);
  const ip_y_coord = parseInt(req.body.ip_y_coord);
  const ip_space = parseInt(req.body.ip_space);

  db.query(`call add_location(?,?,?,?)`, [ip_label, ip_x_coord, ip_y_coord, ip_space],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/add_location", (req, res) => {
  db.query("SELECT * FROM locations", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result);
  });
});

app.post("/start_funding", (req, res) => {
  const ip_owner = req.body.ip_owner;
  const ip_long_name = req.body.ip_long_name;

  db.query(`call start_funding(?,?)`, [ip_owner, ip_long_name ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/start_funding", (req, res) => {
  db.query("SELECT * FROM restaurants", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result);  
  });
});

app.post("/start_funding", (req, res) => {
  const ip_owner = req.body.ip_owner;
  const ip_long_name = req.body.ip_long_name;

  db.query(`call start_funding(?,?)`, [ip_owner, ip_long_name ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/start_funding", (req, res) => {
  db.query("SELECT * FROM restaurants", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result);
  });
});

app.post("/hire_employee", (req, res) => {
  const ip_owner = req.body.ip_owner;
  const ip_id = req.body.ip_id;

  db.query(`call hire_employee(?,?)`, [ip_owner, ip_id ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/hire_employee", (req, res) => {
  db.query("SELECT * FROM work_for", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result); 
  });
});

app.post("/fire_employee", (req, res) => {
  const ip_username = req.body.ip_username;
  const ip_id = req.body.ip_id;

  db.query(`call fire_employee(?,?)`, [ip_username, ip_id ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/fire_employee", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result);
  });
});

app.post("/manage_service", (req, res) => {
  const ip_username = req.body.ip_username;
  const ip_id = req.body.ip_id;

  db.query(`call manage_service(?,?)`, [ip_username, ip_id ],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/manage_service", (req, res) => {
  db.query("SELECT * FROM delivery_services", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result); 
  });
});
 
app.post("/takeover_drone", (req, res) => {
  const ip_username = req.body.ip_username;
  const ip_id = req.body.ip_id;
  const ip_tag = parseInt(req.body.ip_tag);

  db.query(`call takeover_drone(?,?)`, [ip_username, ip_id, ip_tag],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/takeover_drone", (req, res) => {
  db.query("SELECT * FROM drones", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result);
  });
});

app.post("/join_swarm", (req, res) => {
  const ip_id = req.body.ip_id;
  const ip_tag = parseInt(req.body.ip_tag);
  const ip_swarm_leader_tag = parseInt(req.body.ip_swarm_leader_tag);

  db.query(`call join_swarm(?,?,?)`, [ip_id, ip_tag, ip_swarm_leader_tag],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/join_swarm", (req, res) => {
  db.query("SELECT * FROM drones", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result);
  });
});

app.post("/leave_swarm", (req, res) => {
  const ip_id = req.body.ip_id;
  const ip_tag = parseInt(req.body.ip_tag);

  db.query(`call leave_swarm(?,?)`, [ip_id, ip_tag],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/leave_swarm", (req, res) => {
  db.query("SELECT * FROM drones", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result);
  });
});

app.post("/load_drone", (req, res) => {
  const ip_id = req.body.ip_id;
  const ip_tag = parseInt(req.body.ip_tag);
  const ip_barcode = req.body.ip_barcode;
  const ip_more_packages = parseInt(req.body.ip_more_packages);
  const ip_price = parseInt(req.body.ip_price);

  db.query(`call load_drone(?,?,?,?)`, [ip_id, ip_tag, ip_barcode, ip_more_packages, ip_price],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/load_drone", (req, res) => {
  db.query("SELECT * FROM payload", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result);
  });
});

app.post("/refuel_drone", (req, res) => {
  const ip_id = req.body.ip_id;
  const ip_tag = parseInt(req.body.ip_tag);
  const ip_more_fuel = parseInt(req.body.ip_more_fuel);

  db.query(`call refuel_drone(?,?,?,?)`, [ip_id, ip_tag, ip_more_fuel],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/refuel_drone", (req, res) => {
  db.query("SELECT * FROM drones", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result); 
  });
});

app.post("/fly_drone", (req, res) => {
  const ip_id = req.body.ip_id;
  const ip_tag = parseInt(req.body.ip_tag);
  const ip_destination  = req.body.ip_destination;

  db.query(`call fly_drone(?,?,?,?)`, [ip_id, ip_tag, ip_destination],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/fly_drone", (req, res) => {
  db.query("SELECT * FROM drones", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result); 
  });
});

app.post("/purchase_ingredient", (req, res) => {
  const ip_long_name = req.body.ip_long_name;
  const ip_id = req.body.ip_id;
  const ip_tag  = parseInt(req.body.ip_tag);
  const ip_barcode = req.body.ip_barcode;
  const ip_quantity  = parseInt(req.body.ip_quantity);

  db.query(`call purchase_ingredient(?,?,?,?)`, [ip_long_name, ip_id, ip_tag, ip_barcode, ip_quantity],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/purchase_ingredient", (req, res) => {
  db.query("SELECT * FROM payload", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result);
  });
});

app.post("/remove_ingredient", (req, res) => {
  const ip_barcode = req.body.ip_barcode; 

  db.query(`call remove_ingredient(?)`, [ip_barcode],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/remove_ingredient", (req, res) => {
  db.query("SELECT * FROM ingredients", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result);
  });
});

app.post("/remove_drone", (req, res) => {
  const ip_id = req.body.ip_id;
  const ip_tag = parseInt(req.body.ip_tag);  

  db.query(`call remove_drone(?)`, [ip_id, ip_tag],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/remove_drone", (req, res) => {
  db.query("SELECT * FROM drones", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result);
  });
});

app.post("/remove_pilot_role", (req, res) => {
  const ip_username = req.body.ip_username; 

  db.query(`call remove_pilot_role(?)`, [ip_username],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ message: "Error detected" })
        //res.send("Error detected")
      } else {
        res.json({message: "Values inserted" })
      }
    }
  );
});

app.get("/remove_pilot_role", (req, res) => {
  db.query("SELECT * FROM pilots", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result);
  });
});

/**
 * View
 */
app.get("/display_owner_view", (req, res) => {
  db.query("SELECT * FROM display_owner_view", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result); 
  });
});

app.get("/display_employee_view", (req, res) => {
  db.query("SELECT * FROM display_employee_view", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
  });
});

app.get("/display_pilot_view", (req, res) => {
  db.query("SELECT * FROM display_pilot_view", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result);
  });
});

app.get("/display_location_view", (req, res) => {
  db.query("SELECT * FROM display_location_view", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result);
  });
});

app.get("/display_ingredient_view", (req, res) => {
  db.query("SELECT * FROM display_ingredient_view", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result); 
  });
});

app.get("/display_service_view", (req, res) => {
  db.query("SELECT * FROM display_service_view", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ message: "Get Error" })
      //res.send("Error detected")
    }  
    console.log(result);
    res.json(result);
  });
});


app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});

