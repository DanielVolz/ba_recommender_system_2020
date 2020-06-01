function remove_duplicates(arr) {
    var obj = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    for (var key in obj) {
        ret_arr.push(key);
    }
    return ret_arr;
}

var intersect = function (nums1, nums2) {
    var result = nums1.filter(x => nums2.includes(x));
    return [...new Set(result)];
};


var recipes_top10 = [180905,  53075,  42919, 245764,  70012,  75377, 125658,  22286,

        21670, 234797
];

var recipes_user = [38004, 237320,  16563, 142220, 106528,  72277, 228431, 228134,

       149738,  17253
];


var top10_list = [];
db.getCollection('recipes_without_reviews').find({
    id: {
        $in: recipes_top10
    }
}).forEach(

    function (item) {

        for (i = 0; i < recipes_top10.length; i++) {
            if (recipes_top10[i] == item.id) {
                top10_list[i] = item;
            }
        }
    })



var ing_list_id_top10 = [];
top10_list.forEach(function (item) {
    item.ingredients.forEach(function (element) {
        ing_list_id_top10.push(element.id);
    });
});

var recipes_user_list = [];

db.getCollection('recipes_without_reviews').find({
    id: {
        $in: recipes_user
    }
}).forEach(
    function (item) {
        for (i = 0; i < recipes_user.length; i++) {
            if (recipes_user[i] == item.id) {
                recipes_user_list[i] = item;
            }
        }
    })


print(recipes_user_list)
var i = 1;
var ing_list_id_userprofile = [];
recipes_user_list.forEach(function (item) {

    item.ingredients.forEach(function (element) {
        ing_list_id_userprofile.push(element.id);
    });
});

// remove duplicate ingredients from top 10 and user list
var no_ing_dupes_top10 = remove_duplicates(ing_list_id_top10)
var no_ing_dupes_user = remove_duplicates(ing_list_id_userprofile)


var ing_intersect = intersect(no_ing_dupes_top10, no_ing_dupes_user)
var test = intersect(recipes_top10, recipes_user)

//convert string id into ints
var no_ing_dupes_top10 = no_ing_dupes_top10.map(Number)
var no_ing_dupes_user = no_ing_dupes_user.map(Number)
var ing_intersect = ing_intersect.map(Number)

var remove_ing_id = [16421, 4342, 4397, 16406, 16157, 6307, 6494, 2496, 16238, 16317]

//remove not wanted ingredients using the remove_ing_id array
var no_ing_dupes_user = no_ing_dupes_user.filter(function (el) {
    return remove_ing_id.indexOf(el) < 0;
});
var no_ing_dupes_top10 = no_ing_dupes_top10.filter(function (el) {
    return remove_ing_id.indexOf(el) < 0;
});
var ing_intersect = ing_intersect.filter(function (el) {
    return remove_ing_id.indexOf(el) < 0;
});



var result_list = [];

db.getCollection('recipes_without_reviews').find({
    id: {
        $in: recipes_top10
    }
}).forEach(
    function (item) {

        for (i = 0; i < recipes_top10.length; i++) {
            if (recipes_top10[i] == item.id) {
                result_list[i] = item;
            }
        }
    })

var recipe_position = 1;
var count_intersect_ings = 0;
result_list.forEach(function (item) {
    var ing_counter = 0;
    var count_intersct_ings_per_recipe = 0;
    print("##################################################################### \n"+
    "+Pos:" + recipe_position++)
    print(item.name + ", ID: " + item.id + "\n")

    item.nutritions.forEach(function (element) {

        if (element.name == 'Fat' || element.name == 'Carbohydrates') {
            print(element.name + ": " + element.display_value);
        }

    });


    print("\nIngredientss: ")
    item.ingredients.forEach(function (element) {
        ing_counter++;

        for (i = 0; i < ing_intersect.length; i++) {
            if (ing_intersect[i] == element.id) {
                print("ing_id: " + element.id + " ing_name: " + element.name)

                count_intersect_ings++;
               count_intersct_ings_per_recipe++;
            }
        }
    });


    print("\ning_number: " + count_intersct_ings_per_recipe + "/" + ing_counter + " item_rating: " + item.rating + ", made_it_count: " +
        item.made_it_count + ", review_count: " + item.review_count + ", rating_count: " + item.rating_count + "\n");


});

var a = ing_list_id_top10.length / top10_list.length 

var b = ing_intersect.length  / a





print("Einzigartige Ueberschneidungszutaten TOP10 VS Userprofil: " + ing_intersect.length + "\n" +

    "Aufsummiert Ueberschneidungszutaten: " + count_intersect_ings + "\n" +

    "Einzigartige Zutaten TOP10: " + no_ing_dupes_top10.length + "\n" +

    "Durchschnitt Anzahl Zutaten Top10: " + ing_list_id_top10.length / top10_list.length + "\n" +

    "Einzigartige Zutaten User: " + no_ing_dupes_user.length + "\n" +

    "Ueberschneidungszutaten/Durch.Zutaten Top10: " + b.toFixed(2).toString().replace(".", ",") + "\n"

)



print(ing_intersect.length + "\n" +

     count_intersect_ings + "\n" +

     no_ing_dupes_top10.length + "\n" +

     a.toString().replace(".", ",") + "\n" +

     no_ing_dupes_user.length + "\n" +

     b.toFixed(2).toString().replace(".", ",") + "\n"





)

var result_list = [];

db.getCollection('recipes_without_reviews').find({
    id: {
        $in: recipes_user
    }
}).forEach(
    function (item) {

        for (i = 0; i < recipes_user.length; i++) {
            if (recipes_user[i] == item.id) {
                result_list[i] = item;
            }
        }
    })

var recipe_position = 1;
var count_intersect_ings = 0;
result_list.forEach(function (item) {
    var ing_counter = 0;
    var count_intersct_ings_per_recipe = 0;
    print("##################################################################### \n"+
    "+Pos:" + recipe_position++)
    print(item.name + ", ID: " + item.id + "\n")

    item.nutritions.forEach(function (element) {

        if (element.name == 'Fat' || element.name == 'Carbohydrates') {
            print(element.name + ": " + element.display_value);
        }

    });


    print("\nIngredientss: ")
    item.ingredients.forEach(function (element) {
        ing_counter++;

        for (i = 0; i < ing_intersect.length; i++) {
            if (ing_intersect[i] == element.id) {
                print("ing_id: " + element.id + " ing_name: " + element.name)

                count_intersect_ings++;
               count_intersct_ings_per_recipe++;
            }
        }
    });


    print("\ning_number: " + count_intersct_ings_per_recipe + "/" + ing_counter + " item_rating: " + item.rating + ", made_it_count: " +
        item.made_it_count + ", review_count: " + item.review_count + ", rating_count: " + item.rating_count + "\n");


});