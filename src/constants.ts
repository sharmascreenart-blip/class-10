import { Subject } from './types';

export const SUBJECTS: Subject[] = [
  { id: 'maths', name: 'Maths', icon: 'Calculator' },
  { id: 'science', name: 'Science', icon: 'FlaskConical' },
  { id: 'sst', name: 'Social Science', icon: 'Globe' },
  { id: 'english', name: 'English', icon: 'BookOpen' },
  { id: 'hindi', name: 'Hindi', icon: 'Languages' },
];

export const CHAPTERS_DUMMY: Record<string, any[]> = {
  maths: [
    { 
      id: 'm1', 
      title: 'Real Numbers', 
      order: 1, 
      videoUrl: 'https://www.youtube.com/embed/placeholder1',
      summary: 'This chapter explores Euclid\'s Division Lemma, Fundamental Theorem of Arithmetic, and irrational numbers. You will learn how to find HCF and LCM using prime factorization.',
      questions: [
        { question: 'What is the HCF of 96 and 404?', options: ['4', '2', '8', '12'], correctAnswer: 0 },
        { question: 'Is √2 a rational or irrational number?', options: ['Rational', 'Irrational', 'Integer', 'Whole Number'], correctAnswer: 1 }
      ]
    },
    { 
      id: 'm2', 
      title: 'Polynomials', 
      order: 2, 
      videoUrl: 'https://www.youtube.com/embed/placeholder2',
      summary: 'Learn about the degree of polynomials, zeros of a polynomial, and the relationship between zeros and coefficients of quadratic polynomials.',
      questions: [
        { question: 'What is the degree of a linear polynomial?', options: ['0', '1', '2', '3'], correctAnswer: 1 },
        { question: 'If α and β are zeros of ax² + bx + c, then α + β = ?', options: ['c/a', '-b/a', 'b/a', '-c/a'], correctAnswer: 1 }
      ]
    },
    { 
      id: 'm3', 
      title: 'Pair of Linear Equations in Two Variables', 
      order: 3, 
      videoUrl: 'https://www.youtube.com/embed/placeholder3',
      summary: 'Covers graphical and algebraic methods (substitution, elimination) to solve pairs of linear equations.',
      questions: [
        { question: 'If a1/a2 ≠ b1/b2, the equations have:', options: ['Unique solution', 'No solution', 'Infinite solutions', 'Two solutions'], correctAnswer: 0 }
      ]
    },
    { id: 'm4', title: 'Quadratic Equations', order: 4, summary: 'Solving quadratic equations using factorization and quadratic formula.', questions: [{ question: 'Standard form of quadratic equation?', options: ['ax+b=0', 'ax²+bx+c=0', 'ax³+bx²+cx+d=0', 'None'], correctAnswer: 1 }] },
    { id: 'm5', title: 'Arithmetic Progressions', order: 5, summary: 'Understanding sequences where difference between terms is constant.', questions: [{ question: 'Common difference in 2, 4, 6, 8...?', options: ['1', '2', '3', '4'], correctAnswer: 1 }] },
    { id: 'm6', title: 'Triangles', order: 6, summary: 'Similarity of triangles and Pythagoras theorem.', questions: [{ question: 'All equilateral triangles are:', options: ['Similar', 'Congruent', 'Both', 'None'], correctAnswer: 0 }] },
    { id: 'm7', title: 'Coordinate Geometry', order: 7, summary: 'Distance formula, section formula, and area of triangles.', questions: [{ question: 'Distance of (3,4) from origin?', options: ['3', '4', '5', '7'], correctAnswer: 2 }] },
    { id: 'm8', title: 'Introduction to Trigonometry', order: 8, summary: 'Trigonometric ratios like sin, cos, tan.', questions: [{ question: 'Value of sin 90°?', options: ['0', '1/2', '1', 'Undefined'], correctAnswer: 2 }] },
    { id: 'm9', title: 'Some Applications of Trigonometry', order: 9, summary: 'Heights and distances using trigonometry.', questions: [{ question: 'Angle of elevation is measured from:', options: ['Horizontal', 'Vertical', 'Slant', 'None'], correctAnswer: 0 }] },
    { id: 'm10', title: 'Circles', order: 10, summary: 'Tangents to a circle and their properties.', questions: [{ question: 'Number of tangents from a point inside circle?', options: ['0', '1', '2', 'Infinite'], correctAnswer: 0 }] },
    { id: 'm11', title: 'Areas Related to Circles', order: 11, summary: 'Area of sector and segment of a circle.', questions: [{ question: 'Area of circle formula?', options: ['2πr', 'πr²', 'πd', '2πr²'], correctAnswer: 1 }] },
    { id: 'm12', title: 'Surface Areas and Volumes', order: 12, summary: 'Volume and surface area of combination of solids.', questions: [{ question: 'Volume of cone?', options: ['πr²h', '1/3 πr²h', '2/3 πr²h', '4/3 πr³'], correctAnswer: 1 }] },
    { id: 'm13', title: 'Statistics', order: 13, summary: 'Mean, median, and mode of grouped data.', questions: [{ question: 'Mode is the value with:', options: ['Highest frequency', 'Lowest frequency', 'Middle value', 'Average'], correctAnswer: 0 }] },
    { id: 'm14', title: 'Probability', order: 14, summary: 'Theoretical probability of events.', questions: [
      { question: 'Probability of a sure event?', options: ['0', '0.5', '1', '-1'], correctAnswer: 2 },
      { question: 'Probability of an impossible event?', options: ['0', '1', '0.5', 'None'], correctAnswer: 0 },
      { question: 'Sum of probabilities of all elementary events is:', options: ['0', '1', '2', '0.5'], correctAnswer: 1 },
      { question: 'Probability of getting a head in a coin toss?', options: ['0', '1', '0.5', '0.25'], correctAnswer: 2 },
      { question: 'Probability of getting 7 in a die roll?', options: ['1/6', '0', '1', '1/2'], correctAnswer: 1 },
      { question: 'A card is drawn from 52 cards. Probability of an Ace?', options: ['1/13', '1/52', '4/13', '1/4'], correctAnswer: 0 },
      { question: 'P(E) + P(not E) = ?', options: ['0', '1', '0.5', '2'], correctAnswer: 1 },
      { question: 'Which cannot be a probability?', options: ['2/3', '-1.5', '15%', '0.7'], correctAnswer: 1 },
      { question: 'Probability of a leap year having 53 Sundays?', options: ['1/7', '2/7', '3/7', 'None'], correctAnswer: 1 },
      { question: 'If P(E) = 0.05, P(not E) = ?', options: ['0.95', '0.05', '1.05', '0'], correctAnswer: 0 }
    ] }
  ],
  science: [
    { 
      id: 's1', 
      title: 'Chemical Reactions and Equations', 
      order: 1, 
      videoUrl: 'https://www.youtube.com/embed/S2_vH-v2C0Y',
      summary: 'Types of chemical reactions: combination, decomposition, displacement, and redox. Balancing chemical equations is crucial.',
      questions: [
        { question: 'Rusting of iron is an example of:', options: ['Oxidation', 'Reduction', 'Decomposition', 'None'], correctAnswer: 0 },
        { question: 'Which gas is evolved when zinc reacts with dil. H2SO4?', options: ['Oxygen', 'Hydrogen', 'CO2', 'Nitrogen'], correctAnswer: 1 },
        { question: 'A substance which oxidizes itself and reduces others is a:', options: ['Oxidizing agent', 'Reducing agent', 'Catalyst', 'None'], correctAnswer: 1 },
        { question: 'What is the color of copper sulphate solution?', options: ['Green', 'Blue', 'Yellow', 'Colorless'], correctAnswer: 1 },
        { question: 'Burning of magnesium ribbon in air is a:', options: ['Physical change', 'Chemical change', 'Both', 'None'], correctAnswer: 1 },
        { question: 'The reaction in which heat is absorbed is called:', options: ['Exothermic', 'Endothermic', 'Redox', 'Combination'], correctAnswer: 1 },
        { question: 'Formula of Slaked Lime is:', options: ['CaO', 'Ca(OH)2', 'CaCO3', 'CaCl2'], correctAnswer: 1 },
        { question: 'Fatty foods become rancid due to:', options: ['Oxidation', 'Reduction', 'Hydrogenation', 'Corrosion'], correctAnswer: 0 },
        { question: 'Decomposition of lead nitrate gives brown fumes of:', options: ['NO', 'NO2', 'N2O', 'N2'], correctAnswer: 1 },
        { question: 'Which of the following is a displacement reaction?', options: ['Mg + O2 -> MgO', 'Zn + CuSO4 -> ZnSO4 + Cu', 'CaCO3 -> CaO + CO2', 'H2 + O2 -> H2O'], correctAnswer: 1 }
      ]
    },
    { 
      id: 's2', 
      title: 'Acids, Bases and Salts', 
      order: 2, 
      videoUrl: 'https://www.youtube.com/embed/5-9C4zXW8Xo',
      summary: 'Properties of acids and bases, pH scale, and common salts like Bleaching powder, Baking soda, and Washing soda.',
      questions: [
        { question: 'pH of pure water?', options: ['0', '7', '14', '1'], correctAnswer: 1 },
        { question: 'Acid present in tomato is:', options: ['Citric acid', 'Oxalic acid', 'Lactic acid', 'Methanoic acid'], correctAnswer: 1 },
        { question: 'Bases which are soluble in water are called:', options: ['Acids', 'Alkalis', 'Salts', 'Indicators'], correctAnswer: 1 },
        { question: 'What is the pH of milk of magnesia?', options: ['7', '10', '2', '5'], correctAnswer: 1 },
        { question: 'Sodium carbonate is a:', options: ['Acidic salt', 'Basic salt', 'Neutral salt', 'None'], correctAnswer: 1 },
        { question: 'Formula of Plaster of Paris is:', options: ['CaSO4.2H2O', 'CaSO4.1/2H2O', 'CaSO4.H2O', 'CaSO4'], correctAnswer: 1 },
        { question: 'Which acid is produced in our stomach?', options: ['H2SO4', 'HCl', 'HNO3', 'Acetic acid'], correctAnswer: 1 },
        { question: 'Litmus solution is a purple dye extracted from:', options: ['Fungi', 'Lichen', 'Algae', 'Moss'], correctAnswer: 1 },
        { question: 'Nettle sting contains:', options: ['Acetic acid', 'Methanoic acid', 'Citric acid', 'Tartaric acid'], correctAnswer: 1 },
        { question: 'Tooth decay starts when pH of mouth is lower than:', options: ['7.0', '5.5', '6.5', '8.0'], correctAnswer: 1 }
      ]
    },
    { 
      id: 's3', 
      title: 'Metals and Non-metals', 
      order: 3, 
      videoUrl: 'https://www.youtube.com/embed/9XW_9v_m_iY',
      summary: 'Physical and chemical properties of metals and non-metals. Reactivity series and ionic compounds.',
      questions: [
        { question: 'Metal that is liquid at room temperature?', options: ['Sodium', 'Mercury', 'Iron', 'Gold'], correctAnswer: 1 },
        { question: 'Non-metal that conducts electricity?', options: ['Sulphur', 'Graphite', 'Iodine', 'Phosphorus'], correctAnswer: 1 },
        { question: 'Most reactive metal in reactivity series?', options: ['Gold', 'Sodium', 'Potassium', 'Iron'], correctAnswer: 2 },
        { question: 'An alloy of mercury is called:', options: ['Solder', 'Amalgam', 'Brass', 'Bronze'], correctAnswer: 1 },
        { question: 'The process of coating iron with zinc is:', options: ['Anodizing', 'Galvanization', 'Alloying', 'Electroplating'], correctAnswer: 1 },
        { question: 'Non-metal which is lustrous?', options: ['Carbon', 'Iodine', 'Sulphur', 'Nitrogen'], correctAnswer: 1 },
        { question: 'Metals react with acids to produce:', options: ['Oxygen', 'Hydrogen', 'CO2', 'Nitrogen'], correctAnswer: 1 },
        { question: 'Ionic compounds have:', options: ['Low melting point', 'High melting point', 'No melting point', 'None'], correctAnswer: 1 },
        { question: 'Cinnabar is an ore of:', options: ['Iron', 'Mercury', 'Copper', 'Zinc'], correctAnswer: 1 },
        { question: 'Which metal can be cut with a knife?', options: ['Iron', 'Sodium', 'Aluminium', 'Copper'], correctAnswer: 1 }
      ]
    },
    { 
      id: 's4', 
      title: 'Carbon and its Compounds', 
      order: 4, 
      videoUrl: 'https://www.youtube.com/embed/S_S_X_X_X_X', // Placeholder
      summary: 'Versatile nature of carbon, homologous series, and functional groups. Saturated and unsaturated hydrocarbons.',
      questions: [
        { question: 'Valency of carbon?', options: ['2', '3', '4', '1'], correctAnswer: 2 },
        { question: 'General formula of Alkanes?', options: ['CnH2n', 'CnH2n+2', 'CnH2n-2', 'CnHn'], correctAnswer: 1 },
        { question: 'Functional group in Alcohol?', options: ['-CHO', '-OH', '-COOH', '>C=O'], correctAnswer: 1 },
        { question: 'Main component of CNG?', options: ['Ethane', 'Methane', 'Propane', 'Butane'], correctAnswer: 1 },
        { question: 'Unsaturated hydrocarbons contain:', options: ['Single bonds', 'Double/Triple bonds', 'Only double bonds', 'No bonds'], correctAnswer: 1 },
        { question: 'Buckminsterfullerene is an allotrope of:', options: ['Sulphur', 'Carbon', 'Phosphorus', 'Silicon'], correctAnswer: 1 },
        { question: 'Ethanol on oxidation gives:', options: ['Ethane', 'Ethanoic acid', 'Ethene', 'Ethyne'], correctAnswer: 1 },
        { question: 'Soap molecules have a:', options: ['Hydrophilic head', 'Hydrophobic tail', 'Both', 'None'], correctAnswer: 2 },
        { question: 'Hard water contains salts of:', options: ['Na and K', 'Ca and Mg', 'Fe and Cu', 'None'], correctAnswer: 1 },
        { question: 'The process of conversion of sugar into alcohol is:', options: ['Oxidation', 'Fermentation', 'Hydrogenation', 'Saponification'], correctAnswer: 1 }
      ]
    },
    { 
      id: 's5', 
      title: 'Life Processes', 
      order: 5, 
      videoUrl: 'https://www.youtube.com/embed/u_X_X_X_X_X', // Placeholder
      summary: 'Nutrition, respiration, transportation, and excretion in plants and animals.',
      questions: [
        { question: 'Site of photosynthesis?', options: ['Mitochondria', 'Chloroplast', 'Nucleus', 'Ribosome'], correctAnswer: 1 },
        { question: 'Breakdown of pyruvate to give CO2, water and energy takes place in:', options: ['Cytoplasm', 'Mitochondria', 'Chloroplast', 'Nucleus'], correctAnswer: 1 },
        { question: 'The xylem in plants are responsible for:', options: ['Transport of water', 'Transport of food', 'Transport of amino acids', 'Transport of oxygen'], correctAnswer: 0 },
        { question: 'The autotrophic mode of nutrition requires:', options: ['CO2 and water', 'Chlorophyll', 'Sunlight', 'All of the above'], correctAnswer: 3 },
        { question: 'Kidneys in human beings are a part of the system for:', options: ['Nutrition', 'Respiration', 'Excretion', 'Transportation'], correctAnswer: 2 },
        { question: 'Blood pressure is measured by:', options: ['Stethoscope', 'Sphygmomanometer', 'Thermometer', 'Ammeter'], correctAnswer: 1 },
        { question: 'The opening and closing of stomatal pores depends upon:', options: ['Oxygen', 'Temperature', 'Water in guard cells', 'CO2'], correctAnswer: 2 },
        { question: 'Bile juice is secreted by:', options: ['Stomach', 'Pancreas', 'Liver', 'Small Intestine'], correctAnswer: 2 },
        { question: 'The respiratory pigment in human beings is:', options: ['Carotene', 'Chlorophyll', 'Haemoglobin', 'Mitochondria'], correctAnswer: 2 },
        { question: 'Normal systolic pressure is:', options: ['80 mm Hg', '120 mm Hg', '100 mm Hg', '140 mm Hg'], correctAnswer: 1 }
      ]
    },
    {
      id: 's6',
      title: 'Control and Coordination',
      order: 6,
      videoUrl: 'https://www.youtube.com/embed/placeholder6',
      summary: 'Nervous system, reflex action, human brain, and hormones in animals and plants.',
      questions: [
        { question: 'Which part of brain maintains posture and balance?', options: ['Cerebrum', 'Cerebellum', 'Medulla', 'Pons'], correctAnswer: 1 },
        { question: 'Gap between two neurons is called:', options: ['Dendrite', 'Synapse', 'Axon', 'Impulse'], correctAnswer: 1 },
        { question: 'Main thinking part of brain is:', options: ['Forebrain', 'Midbrain', 'Hindbrain', 'Medulla'], correctAnswer: 0 },
        { question: 'Iodine is necessary for the synthesis of:', options: ['Adrenaline', 'Thyroxine', 'Insulin', 'Auxin'], correctAnswer: 1 },
        { question: 'Plant hormone that promotes cell division is:', options: ['Auxin', 'Gibberellin', 'Cytokinin', 'Abscisic acid'], correctAnswer: 2 },
        { question: 'Reflex actions are controlled by:', options: ['Brain', 'Spinal Cord', 'Nerves', 'Muscles'], correctAnswer: 1 },
        { question: 'Master gland of the body is:', options: ['Thyroid', 'Pituitary', 'Adrenal', 'Pancreas'], correctAnswer: 1 },
        { question: 'Insulin is produced by:', options: ['Liver', 'Pancreas', 'Spleen', 'Stomach'], correctAnswer: 1 },
        { question: 'Plant hormone that inhibits growth is:', options: ['Auxin', 'Cytokinin', 'Abscisic acid', 'Gibberellin'], correctAnswer: 2 },
        { question: 'Sudden response to environmental stimulus is:', options: ['Reflex action', 'Thinking', 'Walking', 'Sleeping'], correctAnswer: 0 }
      ]
    },
    {
      id: 's7',
      title: 'How do Organisms Reproduce?',
      order: 7,
      videoUrl: 'https://www.youtube.com/embed/placeholder7',
      summary: 'Asexual and sexual reproduction, reproduction in flowering plants and human beings.',
      questions: [
        { question: 'Amoeba reproduces by:', options: ['Budding', 'Binary fission', 'Fragmentation', 'Spore formation'], correctAnswer: 1 },
        { question: 'Hydra reproduces by:', options: ['Budding', 'Fission', 'Regeneration', 'None'], correctAnswer: 0 },
        { question: 'Male reproductive part of a flower is:', options: ['Sepal', 'Petal', 'Stamen', 'Pistil'], correctAnswer: 2 },
        { question: 'Site of fertilization in humans is:', options: ['Uterus', 'Ovary', 'Fallopian tube', 'Vagina'], correctAnswer: 2 },
        { question: 'Placenta provides nutrition to:', options: ['Mother', 'Embryo', 'Ovary', 'None'], correctAnswer: 1 },
        { question: 'Puberty in girls starts at age:', options: ['10-12', '15-18', '5-8', '20-25'], correctAnswer: 0 },
        { question: 'Contraceptive method that prevents STDs is:', options: ['Condom', 'Copper-T', 'Pills', 'Surgery'], correctAnswer: 0 },
        { question: 'DNA copying is essential for:', options: ['Growth', 'Reproduction', 'Excretion', 'Respiration'], correctAnswer: 1 },
        { question: 'The part of seed that contains food is:', options: ['Radicle', 'Plumule', 'Cotyledon', 'Seed coat'], correctAnswer: 2 },
        { question: 'Testes are located in:', options: ['Abdomen', 'Scrotum', 'Pelvis', 'None'], correctAnswer: 1 }
      ]
    },
    {
      id: 's8',
      title: 'Heredity',
      order: 8,
      videoUrl: 'https://www.youtube.com/embed/placeholder8',
      summary: 'Mendel\'s contribution, sex determination, and basic concepts of heredity.',
      questions: [
        { question: 'Father of Genetics?', options: ['Mendel', 'Darwin', 'Lamarck', 'Morgan'], correctAnswer: 0 },
        { question: 'Plant used by Mendel for experiments?', options: ['Pea', 'Rose', 'Wheat', 'Rice'], correctAnswer: 0 },
        { question: 'Sex of a child is determined by:', options: ['Mother', 'Father', 'Both', 'None'], correctAnswer: 1 },
        { question: 'Number of pairs of chromosomes in humans?', options: ['23', '46', '22', '44'], correctAnswer: 0 },
        { question: 'A cross between tall and short pea plant results in:', options: ['All tall', 'All short', 'Medium', 'None'], correctAnswer: 0 },
        { question: 'Phenotypic ratio of F2 generation in monohybrid cross?', options: ['3:1', '1:2:1', '9:3:3:1', '1:1'], correctAnswer: 0 },
        { question: 'Genotypic ratio of F2 generation in monohybrid cross?', options: ['1:2:1', '3:1', '9:3:3:1', '1:1'], correctAnswer: 0 },
        { question: 'The functional unit of heredity is:', options: ['Gene', 'Chromosome', 'DNA', 'Nucleus'], correctAnswer: 0 },
        { question: 'Acquired traits are:', options: ['Inherited', 'Not inherited', 'Both', 'None'], correctAnswer: 1 },
        { question: 'Human males have chromosomes:', options: ['XX', 'XY', 'YY', 'None'], correctAnswer: 1 }
      ]
    },
    {
      id: 's9',
      title: 'Light - Reflection and Refraction',
      order: 9,
      videoUrl: 'https://www.youtube.com/embed/placeholder9',
      summary: 'Laws of reflection, spherical mirrors, refraction, and lenses.',
      questions: [
        { question: 'Speed of light in vacuum?', options: ['3x10^8 m/s', '3x10^6 m/s', '2x10^8 m/s', 'None'], correctAnswer: 0 },
        { question: 'Mirror used by dentists?', options: ['Concave', 'Convex', 'Plane', 'None'], correctAnswer: 0 },
        { question: 'Power of lens is measured in:', options: ['Dioptre', 'Watt', 'Joule', 'Metre'], correctAnswer: 0 },
        { question: 'Refractive index of water?', options: ['1.33', '1.50', '2.42', '1.00'], correctAnswer: 0 },
        { question: 'Focal length of plane mirror is:', options: ['Zero', 'Infinity', '25 cm', 'None'], correctAnswer: 1 },
        { question: 'Image formed by convex mirror is always:', options: ['Virtual and erect', 'Real and inverted', 'Real and erect', 'None'], correctAnswer: 0 },
        { question: 'Lens formula is:', options: ['1/v - 1/u = 1/f', '1/v + 1/u = 1/f', 'v/u = f', 'None'], correctAnswer: 0 },
        { question: 'Mirror formula is:', options: ['1/v + 1/u = 1/f', '1/v - 1/u = 1/f', 'v/u = f', 'None'], correctAnswer: 0 },
        { question: 'Magnification of plane mirror is:', options: ['+1', '-1', '0', 'Infinity'], correctAnswer: 0 },
        { question: 'The center of reflecting surface of spherical mirror is:', options: ['Pole', 'Center of curvature', 'Focus', 'Aperture'], correctAnswer: 0 }
      ]
    },
    {
      id: 's10',
      title: 'Human Eye and Colourful World',
      order: 10,
      videoUrl: 'https://www.youtube.com/embed/placeholder10',
      summary: 'Structure of human eye, defects of vision, and atmospheric refraction.',
      questions: [
        { question: 'Least distance of distinct vision?', options: ['25 cm', '25 m', 'Infinity', '10 cm'], correctAnswer: 0 },
        { question: 'Defect where person cannot see distant objects?', options: ['Myopia', 'Hypermetropia', 'Presbyopia', 'Cataract'], correctAnswer: 0 },
        { question: 'Lens used to correct Hypermetropia?', options: ['Convex', 'Concave', 'Bifocal', 'Cylindrical'], correctAnswer: 0 },
        { question: 'Splitting of white light into seven colors is:', options: ['Dispersion', 'Reflection', 'Refraction', 'Scattering'], correctAnswer: 0 },
        { question: 'Twinkling of stars is due to:', options: ['Atmospheric refraction', 'Reflection', 'Scattering', 'Dispersion'], correctAnswer: 0 },
        { question: 'Red color of sun at sunrise is due to:', options: ['Scattering', 'Refraction', 'Reflection', 'Dispersion'], correctAnswer: 0 },
        { question: 'Part of eye that controls light entering?', options: ['Iris', 'Pupil', 'Retina', 'Cornea'], correctAnswer: 1 },
        { question: 'Image is formed in the eye at:', options: ['Retina', 'Cornea', 'Iris', 'Lens'], correctAnswer: 0 },
        { question: 'The change in focal length of eye lens is caused by:', options: ['Ciliary muscles', 'Iris', 'Pupil', 'Retina'], correctAnswer: 0 },
        { question: 'Danger signals are red because red light is:', options: ['Scattered least', 'Scattered most', 'Absorbed', 'None'], correctAnswer: 0 }
      ]
    },
    {
      id: 's11',
      title: 'Electricity',
      order: 11,
      videoUrl: 'https://www.youtube.com/embed/placeholder11',
      summary: 'Electric current, potential difference, Ohm\'s law, and heating effect of current.',
      questions: [
        { question: 'SI unit of current?', options: ['Ampere', 'Volt', 'Ohm', 'Watt'], correctAnswer: 0 },
        { question: 'SI unit of resistance?', options: ['Ohm', 'Volt', 'Ampere', 'Watt'], correctAnswer: 0 },
        { question: 'Ohm\'s Law formula?', options: ['V = IR', 'I = VR', 'R = VI', 'None'], correctAnswer: 0 },
        { question: 'Device used to measure current?', options: ['Ammeter', 'Voltmeter', 'Galvanometer', 'None'], correctAnswer: 0 },
        { question: 'Resistivity depends on:', options: ['Material', 'Length', 'Area', 'None'], correctAnswer: 0 },
        { question: '1 kWh is equal to:', options: ['3.6x10^6 J', '3.6x10^5 J', '1000 J', 'None'], correctAnswer: 0 },
        { question: 'Heating effect of current is given by:', options: ['H = I²Rt', 'H = VIt', 'Both', 'None'], correctAnswer: 2 },
        { question: 'Filament of bulb is made of:', options: ['Tungsten', 'Copper', 'Aluminium', 'Iron'], correctAnswer: 0 },
        { question: 'Fuse wire should have:', options: ['Low melting point', 'High melting point', 'High resistance', 'None'], correctAnswer: 0 },
        { question: 'Potential difference is measured by:', options: ['Voltmeter', 'Ammeter', 'Galvanometer', 'None'], correctAnswer: 0 }
      ]
    },
    {
      id: 's12',
      title: 'Magnetic Effects of Electric Current',
      order: 12,
      videoUrl: 'https://www.youtube.com/embed/placeholder12',
      summary: 'Magnetic field, field lines, electromagnetism, and domestic electric circuits.',
      questions: [
        { question: 'Magnetic field lines emerge from:', options: ['North Pole', 'South Pole', 'Center', 'None'], correctAnswer: 0 },
        { question: 'Device that converts electrical energy to mechanical?', options: ['Motor', 'Generator', 'Transformer', 'None'], correctAnswer: 0 },
        { question: 'Device that converts mechanical energy to electrical?', options: ['Generator', 'Motor', 'Transformer', 'None'], correctAnswer: 0 },
        { question: 'Rule to find direction of induced current?', options: ['Fleming\'s Right Hand Rule', 'Fleming\'s Left Hand Rule', 'Right Hand Thumb Rule', 'None'], correctAnswer: 0 },
        { question: 'Color of earth wire is:', options: ['Green', 'Red', 'Black', 'Blue'], correctAnswer: 0 },
        { question: 'Magnetic field inside a long solenoid is:', options: ['Same at all points', 'Zero', 'Decreases', 'Increases'], correctAnswer: 0 },
        { question: 'Who discovered electromagnetism?', options: ['Oersted', 'Faraday', 'Ampere', 'Newton'], correctAnswer: 0 },
        { question: 'AC frequency in India is:', options: ['50 Hz', '60 Hz', '100 Hz', 'None'], correctAnswer: 0 },
        { question: 'Short circuit occurs when live and neutral wires:', options: ['Touch each other', 'Are far', 'Are broken', 'None'], correctAnswer: 0 },
        { question: 'Overloading is prevented by:', options: ['Fuse', 'Switch', 'Ammeter', 'None'], correctAnswer: 0 }
      ]
    },
    {
      id: 's13',
      title: 'Our Environment',
      order: 13,
      videoUrl: 'https://www.youtube.com/embed/placeholder13',
      summary: 'Ecosystem, food chain, ozone layer, and waste management.',
      questions: [
        { question: 'Which is a biodegradable waste?', options: ['Paper', 'Plastic', 'Glass', 'Metal'], correctAnswer: 0 },
        { question: 'Trophic level of producers?', options: ['First', 'Second', 'Third', 'Fourth'], correctAnswer: 0 },
        { question: 'Ozone layer protects from:', options: ['UV rays', 'X-rays', 'Infrared', 'None'], correctAnswer: 0 },
        { question: 'Main cause of ozone depletion?', options: ['CFCs', 'CO2', 'CH4', 'None'], correctAnswer: 0 },
        { question: 'Flow of energy in ecosystem is:', options: ['Unidirectional', 'Bidirectional', 'Multidirectional', 'None'], correctAnswer: 0 },
        { question: '10% law of energy transfer was given by:', options: ['Lindeman', 'Darwin', 'Mendel', 'None'], correctAnswer: 0 },
        { question: 'Accumulation of chemicals in food chain is:', options: ['Biological magnification', 'Eutrophication', 'Pollution', 'None'], correctAnswer: 0 },
        { question: 'Primary consumers are:', options: ['Herbivores', 'Carnivores', 'Omnivores', 'Producers'], correctAnswer: 0 },
        { question: 'Decomposers are:', options: ['Bacteria and Fungi', 'Plants', 'Animals', 'None'], correctAnswer: 0 },
        { question: 'Which is an artificial ecosystem?', options: ['Crop field', 'Forest', 'Pond', 'Lake'], correctAnswer: 0 }
      ]
    }
  ],
  sst: [
    { 
      id: 'ss1', 
      title: 'The Rise of Nationalism in Europe', 
      order: 1, 
      summary: 'French Revolution, Napoleon, and unification of Italy/Germany.', 
      questions: [
        { question: 'Who was Frederic Sorrieu?', options: ['Artist', 'Politician', 'Scientist', 'King'], correctAnswer: 0 },
        { question: 'When did the French Revolution occur?', options: ['1789', '1799', '1804', '1815'], correctAnswer: 0 },
        { question: 'What was the main aim of the French revolutionaries?', options: ['Monarchy', 'Democracy', 'Dictatorship', 'Sovereignty'], correctAnswer: 1 },
        { question: 'Who was proclaimed German Emperor in 1871?', options: ['William I', 'William II', 'Bismarck', 'Napoleon'], correctAnswer: 0 },
        { question: 'The Civil Code of 1804 is also known as:', options: ['Napoleon Code', 'French Code', 'European Code', 'None'], correctAnswer: 0 },
        { question: 'What does "Liberty" stand for in the French Revolution?', options: ['Freedom', 'Equality', 'Fraternity', 'All'], correctAnswer: 0 },
        { question: 'Who was the architect of German unification?', options: ['Bismarck', 'Mazzini', 'Garibaldi', 'Cavour'], correctAnswer: 0 },
        { question: 'What was "Young Italy"?', options: ['Secret Society', 'Political Party', 'Army', 'School'], correctAnswer: 0 },
        { question: 'Who said "When France sneezes, the rest of Europe catches cold"?', options: ['Metternich', 'Napoleon', 'Mazzini', 'Bismarck'], correctAnswer: 0 },
        { question: 'Which treaty recognized Greece as an independent nation?', options: ['Constantinople', 'Vienna', 'Versailles', 'None'], correctAnswer: 0 }
      ] 
    },
    { 
      id: 'ss2', 
      title: 'Nationalism in India', 
      order: 2, 
      summary: 'Non-Cooperation, Civil Disobedience, and Quit India movement.', 
      questions: [
        { question: 'When did Jallianwala Bagh incident happen?', options: ['1919', '1920', '1921', '1922'], correctAnswer: 0 },
        { question: 'Who led the Salt March?', options: ['Gandhi', 'Nehru', 'Patel', 'Bose'], correctAnswer: 0 },
        { question: 'When was the Non-Cooperation Movement started?', options: ['1920', '1921', '1922', '1919'], correctAnswer: 0 },
        { question: 'What was the main reason for withdrawing Non-Cooperation?', options: ['Chauri Chaura', 'Rowlatt Act', 'Salt Tax', 'None'], correctAnswer: 0 },
        { question: 'Who wrote "Hind Swaraj"?', options: ['Gandhi', 'Nehru', 'Tilak', 'Bose'], correctAnswer: 0 },
        { question: 'When was the Simon Commission sent to India?', options: ['1928', '1927', '1929', '1930'], correctAnswer: 0 },
        { question: 'Who was the first President of Indian National Congress?', options: ['W.C. Bonnerjee', 'Gandhi', 'Nehru', 'Naidu'], correctAnswer: 0 },
        { question: 'What was the Rowlatt Act?', options: ['Black Act', 'Education Act', 'Trade Act', 'None'], correctAnswer: 0 },
        { question: 'Where did Gandhi start his first Satyagraha in India?', options: ['Champaran', 'Kheda', 'Ahmedabad', 'Dandi'], correctAnswer: 0 },
        { question: 'When was the Poona Pact signed?', options: ['1932', '1931', '1933', '1930'], correctAnswer: 0 }
      ] 
    },
    { 
      id: 'ss3', 
      title: 'Resources and Development', 
      order: 3, 
      summary: 'Types of resources and sustainable development.', 
      questions: [
        { question: 'Which soil is best for cotton?', options: ['Alluvial', 'Black', 'Red', 'Laterite'], correctAnswer: 1 },
        { question: 'What are biotic resources?', options: ['Living', 'Non-living', 'Renewable', 'None'], correctAnswer: 0 },
        { question: 'Which state has the most forest cover?', options: ['MP', 'Mizoram', 'Arunachal', 'Haryana'], correctAnswer: 1 },
        { question: 'What is sustainable development?', options: ['Future needs', 'Current needs', 'Both', 'None'], correctAnswer: 2 },
        { question: 'Which resource is non-renewable?', options: ['Coal', 'Solar', 'Wind', 'Water'], correctAnswer: 0 },
        { question: 'What is the main cause of land degradation in Punjab?', options: ['Over irrigation', 'Deforestation', 'Mining', 'None'], correctAnswer: 0 },
        { question: 'Which soil is found in the Indo-Gangetic plains?', options: ['Alluvial', 'Black', 'Red', 'Arid'], correctAnswer: 0 },
        { question: 'What is "Agenda 21"?', options: ['Environment plan', 'Trade plan', 'War plan', 'None'], correctAnswer: 0 },
        { question: 'Which resource is ubiquitous?', options: ['Air', 'Iron', 'Gold', 'Coal'], correctAnswer: 0 },
        { question: 'What is the full form of IUCN?', options: ['International Union for Conservation of Nature', 'Indian Union...', 'International Unit...', 'None'], correctAnswer: 0 }
      ] 
    },
    { 
      id: 'ss4', 
      title: 'Power Sharing', 
      order: 4, 
      summary: 'Case studies of Belgium and Sri Lanka.', 
      questions: [
        { question: 'Capital of Belgium?', options: ['Brussels', 'Antwerp', 'Ghent', 'Liege'], correctAnswer: 0 },
        { question: 'Which community is in majority in Sri Lanka?', options: ['Sinhala', 'Tamil', 'Muslim', 'Christian'], correctAnswer: 0 },
        { question: 'What is the official language of Sri Lanka?', options: ['Sinhala', 'Tamil', 'English', 'Hindi'], correctAnswer: 0 },
        { question: 'How many times was the Belgian constitution amended?', options: ['4', '3', '2', '5'], correctAnswer: 0 },
        { question: 'What is "Community Government" in Belgium?', options: ['Language based', 'Religion based', 'Region based', 'None'], correctAnswer: 0 },
        { question: 'Power sharing is the spirit of:', options: ['Democracy', 'Monarchy', 'Dictatorship', 'None'], correctAnswer: 0 },
        { question: 'Horizontal distribution of power is between:', options: ['Organs of govt', 'Levels of govt', 'Parties', 'None'], correctAnswer: 0 },
        { question: 'Vertical distribution of power is between:', options: ['Levels of govt', 'Organs of govt', 'Parties', 'None'], correctAnswer: 0 },
        { question: 'Which city is the headquarters of EU?', options: ['Brussels', 'Paris', 'Berlin', 'Rome'], correctAnswer: 0 },
        { question: 'What is a coalition government?', options: ['Alliance of parties', 'Single party', 'Military govt', 'None'], correctAnswer: 0 }
      ] 
    },
    { 
      id: 'ss5', 
      title: 'Development', 
      order: 5, 
      summary: 'Income and other goals, national development.', 
      questions: [
        { question: 'HDI stands for:', options: ['Human Development Index', 'High Development Index', 'Human Data Index', 'None'], correctAnswer: 0 },
        { question: 'What is the main criterion used by World Bank?', options: ['Per capita income', 'Literacy', 'Health', 'None'], correctAnswer: 0 },
        { question: 'Which state has the highest literacy rate?', options: ['Kerala', 'Bihar', 'Punjab', 'Tamil Nadu'], correctAnswer: 0 },
        { question: 'What is BMI?', options: ['Body Mass Index', 'Body Muscle Index', 'Body Main Index', 'None'], correctAnswer: 0 },
        { question: 'What is the full form of PDS?', options: ['Public Distribution System', 'Private...', 'Personal...', 'None'], correctAnswer: 0 },
        { question: 'Infant Mortality Rate is per:', options: ['1000 live births', '100 live births', '10000 live births', 'None'], correctAnswer: 0 },
        { question: 'What is Net Attendance Ratio?', options: ['School attendance', 'Hospital attendance', 'Office attendance', 'None'], correctAnswer: 0 },
        { question: 'Development of a country is generally determined by:', options: ['Per capita income', 'Literacy', 'Health status', 'All'], correctAnswer: 3 },
        { question: 'Which organization publishes HDR?', options: ['UNDP', 'World Bank', 'IMF', 'WHO'], correctAnswer: 0 },
        { question: 'What is the most common indicator of development?', options: ['Income', 'Education', 'Health', 'None'], correctAnswer: 0 }
      ] 
    },
    {
      id: 'ss6',
      title: 'Sectors of the Indian Economy',
      order: 6,
      summary: 'Primary, secondary, and tertiary sectors. Organized and unorganized sectors.',
      questions: [
        { question: 'Which sector is also called service sector?', options: ['Primary', 'Secondary', 'Tertiary', 'None'], correctAnswer: 2 },
        { question: 'Agriculture comes under which sector?', options: ['Primary', 'Secondary', 'Tertiary', 'None'], correctAnswer: 0 },
        { question: 'GDP is the total value of:', options: ['Final goods', 'Intermediate goods', 'All goods', 'None'], correctAnswer: 0 },
        { question: 'Disguised unemployment is found in:', options: ['Agriculture', 'Industry', 'Services', 'None'], correctAnswer: 0 },
        { question: 'MGNREGA 2005 guarantees how many days of work?', options: ['100 days', '150 days', '200 days', '50 days'], correctAnswer: 0 },
        { question: 'Public sector aim is:', options: ['Social welfare', 'Profit', 'Both', 'None'], correctAnswer: 0 },
        { question: 'Private sector aim is:', options: ['Profit', 'Social welfare', 'Both', 'None'], correctAnswer: 0 },
        { question: 'Tertiary sector includes:', options: ['Transport', 'Banking', 'Communication', 'All'], correctAnswer: 3 },
        { question: 'Organized sector provides:', options: ['Job security', 'Low wages', 'No leave', 'None'], correctAnswer: 0 },
        { question: 'Which sector contributes most to India\'s GDP?', options: ['Tertiary', 'Primary', 'Secondary', 'None'], correctAnswer: 0 }
      ]
    },
    {
      id: 'ss7',
      title: 'Money and Credit',
      order: 7,
      summary: 'Money as a medium of exchange, formal and informal credit sources.',
      questions: [
        { question: 'Who issues currency in India?', options: ['RBI', 'SBI', 'Govt of India', 'None'], correctAnswer: 0 },
        { question: 'Double coincidence of wants is a feature of:', options: ['Barter system', 'Money system', 'Credit system', 'None'], correctAnswer: 0 },
        { question: 'Formal source of credit includes:', options: ['Banks', 'Moneylenders', 'Friends', 'Relatives'], correctAnswer: 0 },
        { question: 'Informal source of credit includes:', options: ['Moneylenders', 'Banks', 'Cooperatives', 'None'], correctAnswer: 0 },
        { question: 'Self Help Groups (SHGs) usually have:', options: ['15-20 members', '100 members', '5 members', 'None'], correctAnswer: 0 },
        { question: 'Collateral is:', options: ['Asset as guarantee', 'Loan amount', 'Interest rate', 'None'], correctAnswer: 0 },
        { question: 'Main aim of SHGs is to:', options: ['Provide credit', 'Earn profit', 'Build houses', 'None'], correctAnswer: 0 },
        { question: 'Which is a modern form of money?', options: ['Paper notes', 'Gold coins', 'Silver coins', 'None'], correctAnswer: 0 },
        { question: 'Cheque is a:', options: ['Paper instructing bank', 'Currency', 'Coin', 'None'], correctAnswer: 0 },
        { question: 'Interest rate on informal loans is usually:', options: ['Very high', 'Low', 'Zero', 'None'], correctAnswer: 0 }
      ]
    },
    {
      id: 'ss8',
      title: 'Globalisation and the Indian Economy',
      order: 8,
      summary: 'MNCs, foreign trade, and impact of globalisation.',
      questions: [
        { question: 'MNC stands for:', options: ['Multinational Corporation', 'Multi National Company', 'Multi National Club', 'None'], correctAnswer: 0 },
        { question: 'Liberalisation means:', options: ['Removing barriers', 'Adding barriers', 'Closing economy', 'None'], correctAnswer: 0 },
        { question: 'WTO stands for:', options: ['World Trade Organization', 'World Tourism...', 'World Tech...', 'None'], correctAnswer: 0 },
        { question: 'Main aim of WTO is to:', options: ['Liberalise trade', 'Restrict trade', 'Tax trade', 'None'], correctAnswer: 0 },
        { question: 'SEZ stands for:', options: ['Special Economic Zone', 'Social...', 'Small...', 'None'], correctAnswer: 0 },
        { question: 'Globalisation has led to:', options: ['More choice', 'Less choice', 'No change', 'None'], correctAnswer: 0 },
        { question: 'Foreign investment is investment by:', options: ['MNCs', 'Local companies', 'Govt', 'None'], correctAnswer: 0 },
        { question: 'Integration of markets is called:', options: ['Globalisation', 'Liberalisation', 'Privatisation', 'None'], correctAnswer: 0 },
        { question: 'Which industry was hit hard by globalisation?', options: ['Small scale', 'IT', 'Automobile', 'None'], correctAnswer: 0 },
        { question: 'Ford Motors is an MNC of:', options: ['USA', 'India', 'China', 'Japan'], correctAnswer: 0 }
      ]
    },
    {
      id: 'ss9',
      title: 'Forest and Wildlife Resources',
      order: 9,
      summary: 'Biodiversity, flora and fauna in India, and conservation efforts.',
      questions: [
        { question: 'Which state has the largest area under permanent forests?', options: ['MP', 'Odisha', 'Kerala', 'None'], correctAnswer: 0 },
        { question: 'Project Tiger was launched in:', options: ['1973', '1983', '1993', 'None'], correctAnswer: 0 }
      ]
    },
    {
      id: 'ss10',
      title: 'Water Resources',
      order: 10,
      summary: 'Water scarcity, multi-purpose river projects, and rainwater harvesting.',
      questions: [
        { question: 'Which dam is built on river Satluj?', options: ['Bhakra Nangal', 'Hirakud', 'Tehri', 'None'], correctAnswer: 0 },
        { question: 'Roof top rainwater harvesting is common in:', options: ['Rajasthan', 'Punjab', 'Assam', 'None'], correctAnswer: 0 }
      ]
    },
    {
      id: 'ss11',
      title: 'Agriculture',
      order: 11,
      summary: 'Types of farming, cropping patterns, and major crops in India.',
      questions: [
        { question: 'Which is a Kharif crop?', options: ['Rice', 'Wheat', 'Gram', 'None'], correctAnswer: 0 },
        { question: 'Golden fiber refers to:', options: ['Jute', 'Cotton', 'Silk', 'None'], correctAnswer: 0 }
      ]
    },
    {
      id: 'ss12',
      title: 'Federalism',
      order: 12,
      summary: 'Concept of federalism, decentralization in India, and power distribution.',
      questions: [
        { question: 'Who is the head of Municipal Corporation?', options: ['Mayor', 'Sarpanch', 'MLA', 'None'], correctAnswer: 0 },
        { question: 'Which list includes subjects like defense and banking?', options: ['Union List', 'State List', 'Concurrent List', 'None'], correctAnswer: 0 }
      ]
    }
  ],
  english: [
    { 
      id: 'e1', 
      title: 'A Letter to God', 
      order: 1, 
      summary: 'Story of Lencho\'s faith in God and the postmaster\'s kindness.', 
      questions: [
        { question: 'What did Lencho hope for?', options: ['Rain', 'Sun', 'Snow', 'Money'], correctAnswer: 0 },
        { question: 'Who was Lencho?', options: ['Farmer', 'Postman', 'Doctor', 'Teacher'], correctAnswer: 0 },
        { question: 'How much money did Lencho ask for?', options: ['100 pesos', '70 pesos', '50 pesos', '150 pesos'], correctAnswer: 0 },
        { question: 'How much money did he receive?', options: ['70 pesos', '100 pesos', '50 pesos', 'None'], correctAnswer: 0 },
        { question: 'What was Lencho\'s reaction on seeing the money?', options: ['Angry', 'Happy', 'Surprised', 'Sad'], correctAnswer: 0 },
        { question: 'What did he call the post office employees?', options: ['Bunch of crooks', 'Kind people', 'Helpers', 'None'], correctAnswer: 0 },
        { question: 'Where was Lencho\'s house situated?', options: ['Crest of a low hill', 'Valley', 'City', 'Forest'], correctAnswer: 0 },
        { question: 'What destroyed Lencho\'s field?', options: ['Hailstones', 'Rain', 'Locusts', 'Flood'], correctAnswer: 0 },
        { question: 'Who read the letter sent by Lencho?', options: ['Postmaster', 'God', 'Wife', 'Son'], correctAnswer: 0 },
        { question: 'What was the only hope left in Lencho\'s heart?', options: ['Help from God', 'Help from neighbors', 'Rain', 'None'], correctAnswer: 0 }
      ] 
    },
    { 
      id: 'e2', 
      title: 'Nelson Mandela: Long Walk to Freedom', 
      order: 2, 
      summary: 'Mandela\'s journey from prisoner to president of South Africa.', 
      questions: [
        { question: 'Who was the first black president of South Africa?', options: ['Mandela', 'Tambo', 'Sisulu', 'Mbeki'], correctAnswer: 0 },
        { question: 'When was the inauguration day?', options: ['10th May', '10th April', '10th June', 'None'], correctAnswer: 0 },
        { question: 'What is "Apartheid"?', options: ['Racial discrimination', 'Political system', 'Religious system', 'None'], correctAnswer: 0 },
        { question: 'How many years did Mandela spend in prison?', options: ['30 years', '20 years', '10 years', '40 years'], correctAnswer: 0 },
        { question: 'What does "courage" mean to Mandela?', options: ['Triumph over fear', 'Absence of fear', 'Bravery', 'None'], correctAnswer: 0 },
        { question: 'Who accompanied Mandela on the inauguration?', options: ['His daughter', 'His wife', 'His son', 'None'], correctAnswer: 0 },
        { question: 'What are the twin obligations Mandela talks about?', options: ['Family and Country', 'Work and Play', 'Self and God', 'None'], correctAnswer: 0 },
        { question: 'What was the color of the new South African flag?', options: ['V-shaped pattern', 'Single color', 'Stripes', 'None'], correctAnswer: 0 },
        { question: 'What did the smoke trail of Impala jets symbolize?', options: ['New flag', 'Victory', 'Peace', 'None'], correctAnswer: 0 },
        { question: 'Mandela was a man of:', options: ['Resilience', 'Hatred', 'Fear', 'None'], correctAnswer: 0 }
      ] 
    },
    { 
      id: 'e3', 
      title: 'Two Stories about Flying', 
      order: 3, 
      summary: 'Stories of a young seagull and a black aeroplane.', 
      questions: [
        { question: 'Why was the seagull afraid?', options: ['Fear of height', 'Fear of water', 'Fear of wind', 'None'], correctAnswer: 0 },
        { question: 'Who helped the young seagull to fly?', options: ['His mother', 'His father', 'His brother', 'None'], correctAnswer: 0 },
        { question: 'What was the seagull\'s first flight like?', options: ['Terrifying then joyful', 'Easy', 'Boring', 'None'], correctAnswer: 0 },
        { question: 'Where did the seagull sleep at night?', options: ['In a ledge', 'In a nest', 'On a tree', 'None'], correctAnswer: 0 },
        { question: 'What did the seagull eat first?', options: ['Dogfish', 'Herring', 'Mackerel', 'None'], correctAnswer: 1 },
        { question: 'Who was the pilot of the black aeroplane?', options: ['Unknown', 'Mandela', 'Lencho', 'None'], correctAnswer: 0 },
        { question: 'Where was the pilot flying to?', options: ['England', 'France', 'Germany', 'None'], correctAnswer: 0 },
        { question: 'What happened to the pilot\'s compass?', options: ['Stopped working', 'Worked fine', 'Lost', 'None'], correctAnswer: 0 },
        { question: 'Who guided the pilot out of the storm?', options: ['Black aeroplane', 'Radio', 'Radar', 'None'], correctAnswer: 0 },
        { question: 'What was the pilot\'s reaction after landing?', options: ['Relieved', 'Angry', 'Sad', 'None'], correctAnswer: 0 }
      ] 
    },
    {
      id: 'e4',
      title: 'From the Diary of Anne Frank',
      order: 4,
      summary: 'Excerpts from Anne Frank\'s diary during her time in hiding.',
      questions: [
        { question: 'Who was Anne Frank?', options: ['Jewish girl', 'German girl', 'French girl', 'None'], correctAnswer: 0 },
        { question: 'What was the name of her diary?', options: ['Kitty', 'Mitty', 'Bitty', 'None'], correctAnswer: 0 },
        { question: 'Where did she hide?', options: ['Secret Annex', 'Basement', 'Attic', 'None'], correctAnswer: 0 },
        { question: 'Who was Mr. Keesing?', options: ['Maths teacher', 'English teacher', 'Principal', 'None'], correctAnswer: 0 }
      ]
    },
    {
      id: 'e5',
      title: 'Glimpses of India',
      order: 5,
      summary: 'Three stories: A Baker from Goa, Coorg, and Tea from Assam.',
      questions: [
        { question: 'Where is Coorg situated?', options: ['Karnataka', 'Kerala', 'Tamil Nadu', 'None'], correctAnswer: 0 },
        { question: 'What is the main crop of Coorg?', options: ['Coffee', 'Tea', 'Rubber', 'None'], correctAnswer: 0 },
        { question: 'Who are the descendants of Coorg people?', options: ['Arabs/Greeks', 'Indians', 'British', 'None'], correctAnswer: 0 }
      ]
    },
    {
      id: 'e6',
      title: 'Madam Rides the Bus',
      order: 6,
      summary: 'Story of an eight-year-old girl Valli and her first bus ride.',
      questions: [
        { question: 'What was Valli\'s full name?', options: ['Valliammai', 'Vallika', 'Valli', 'None'], correctAnswer: 0 },
        { question: 'How old was Valli?', options: ['8 years', '10 years', '12 years', 'None'], correctAnswer: 0 },
        { question: 'What was her favorite pastime?', options: ['Standing in doorway', 'Playing', 'Reading', 'None'], correctAnswer: 0 }
      ]
    }
  ],
  hindi: [
    { 
      id: 'h1', 
      title: 'Surdas ke Pad', 
      order: 1, 
      summary: 'Gopis\' love for Krishna and their conversation with Uddhav.', 
      questions: [
        { question: 'Surdas kis bhasha ke kavi hain?', options: ['Braj', 'Awadhi', 'Khadi Boli', 'Maithili'], correctAnswer: 0 },
        { question: 'Gopiyan kise bhagyashali keh rahi hain?', options: ['Uddhav', 'Krishna', 'Surdas', 'Swayam ko'], correctAnswer: 0 },
        { question: 'Uddhav kiska sandesh lekar aaye the?', options: ['Yog', 'Prem', 'Yuddh', 'Shanti'], correctAnswer: 0 },
        { question: 'Gopiyon ne Uddhav ki tulna kisse ki hai?', options: ['Kamal ke patte', 'Tel ki gagri', 'Dono', 'Kisi se nahi'], correctAnswer: 2 },
        { question: 'Gopiyon ke liye Krishna kiske saman hain?', options: ['Haril ki lakdi', 'Phool', 'Phal', 'None'], correctAnswer: 0 },
        { question: 'Gopiyon ne yog ko kaisa bataya hai?', options: ['Kadvi kakdi', 'Meetha phal', 'Amrit', 'None'], correctAnswer: 0 },
        { question: 'Surdas ke padon mein kaun sa ras hai?', options: ['Vipralambha Shringar', 'Veer', 'Karun', 'Hasya'], correctAnswer: 0 },
        { question: 'Gopiyon ne kise rajdharm yaad dilaya?', options: ['Uddhav', 'Krishna', 'Nand', 'None'], correctAnswer: 0 },
        { question: 'Surdas ke guru kaun the?', options: ['Vallabhacharya', 'Ramanand', 'Tulsidas', 'None'], correctAnswer: 0 },
        { question: 'Gopiyan virah ki agni mein kyun jal rahi thin?', options: ['Krishna ke na aane par', 'Uddhav ke aane par', 'Garmi ke karan', 'None'], correctAnswer: 0 }
      ] 
    },
    { 
      id: 'h2', 
      title: 'Ram-Lakshman-Parshuram Samvad', 
      order: 2, 
      summary: 'Dialogue between Ram, Lakshman and Parshuram after Shiva\'s bow broke.', 
      questions: [
        { question: 'Shiva dhanush kisne toda?', options: ['Ram', 'Lakshman', 'Bharat', 'Shatrughan'], correctAnswer: 0 },
        { question: 'Parshuram kyon krodhit the?', options: ['Dhanush tootne par', 'Ram ke karan', 'Lakshman ke karan', 'None'], correctAnswer: 0 },
        { question: 'Lakshman ne dhanush ko kya bataya?', options: ['Purana', 'Naya', 'Majboot', 'None'], correctAnswer: 0 },
        { question: 'Parshuram ne khud ko kya kaha?', options: ['Bal Brahmachari', 'Kshatriyakul drohi', 'Dono', 'None'], correctAnswer: 2 },
        { question: 'Parshuram ka shastra kya tha?', options: ['Farsha', 'Talwar', 'Teer', 'Gada'], correctAnswer: 0 },
        { question: 'Ram ne Parshuram se kaise baat ki?', options: ['Vinamrata se', 'Krodh se', 'Mazak se', 'None'], correctAnswer: 0 },
        { question: 'Lakshman ne Parshuram ka mazak kaise udaya?', options: ['Vyangya se', 'Gali se', 'Chup rehkar', 'None'], correctAnswer: 0 },
        { question: 'Parshuram ne Sahastrabahu ka kya kiya tha?', options: ['Vadh', 'Mitrata', 'Sahaayta', 'None'], correctAnswer: 0 },
        { question: 'Yeh samvad kis granth se liya gaya hai?', options: ['Ramcharitmanas', 'Ramayan', 'Saket', 'None'], correctAnswer: 0 },
        { question: 'Bhrigukul ketu kise kaha gaya hai?', options: ['Parshuram', 'Ram', 'Lakshman', 'Vishwamitra'], correctAnswer: 0 }
      ] 
    },
    { 
      id: 'h3', 
      title: 'Netaji ka Chashma', 
      order: 3, 
      summary: 'Story of a captain who puts glasses on Netaji\'s statue.', 
      questions: [
        { question: 'Netaji ki murti kahan lagi thi?', options: ['Chauraha', 'School', 'Park', 'Ghar'], correctAnswer: 0 },
        { question: 'Murti kisne banayi thi?', options: ['Moti Lal', 'Captain', 'Haldar Saheb', 'None'], correctAnswer: 0 },
        { question: 'Murti mein kya kami thi?', options: ['Chashma nahi tha', 'Naak nahi thi', 'Haath nahi tha', 'None'], correctAnswer: 0 },
        { question: 'Captain kaun tha?', options: ['Chashme wala', 'Fauji', 'Haldar', 'None'], correctAnswer: 0 },
        { question: 'Haldar Saheb har kitne din baad kasbe se guzarte the?', options: ['15 din', '10 din', '7 din', '30 din'], correctAnswer: 0 },
        { question: 'Pan wale ka swabhav kaisa tha?', options: ['Khushmizaj', 'Gusse wala', 'Rone wala', 'None'], correctAnswer: 0 },
        { question: 'Netaji ka chashma kaun badalta tha?', options: ['Captain', 'Haldar', 'Moti Lal', 'None'], correctAnswer: 0 },
        { question: 'Ant mein murti par kiska chashma tha?', options: ['Sarkande ka', 'Kaanch ka', 'Lohe ka', 'None'], correctAnswer: 0 },
        { question: 'Haldar Saheb kyon bhavuk ho gaye?', options: ['Deshbhakti dekhkar', 'Murti dekhkar', 'Captain ki maut par', 'None'], correctAnswer: 0 },
        { question: 'Yeh kahani kiske dwara likhi gayi hai?', options: ['Swayam Prakash', 'Premchand', 'Yashpal', 'None'], correctAnswer: 0 }
      ] 
    },
    {
      id: 'h4',
      title: 'Balgobin Bhagat',
      order: 4,
      summary: 'Story of a man who lived a simple, saintly life despite being a householder.',
      questions: [
        { question: 'Balgobin Bhagat kiske bhakt the?', options: ['Kabir', 'Surdas', 'Tulsidas', 'None'], correctAnswer: 0 },
        { question: 'Bhagat ji ki umra kya thi?', options: ['60 se upar', '50 se upar', '70 se upar', 'None'], correctAnswer: 0 },
        { question: 'Bhagat ji kheti-bari karte the?', options: ['Haan', 'Nahi', 'Kabhi-kabhi', 'None'], correctAnswer: 0 }
      ]
    },
    {
      id: 'h5',
      title: 'Lakhnavi Andaaz',
      order: 5,
      summary: 'A satirical story about the pseudo-aristocratic lifestyle of a Nawab.',
      questions: [
        { question: 'Nawab sahab ne khire ka kya kiya?', options: ['Khaya', 'Phenk diya', 'Bech diya', 'None'], correctAnswer: 1 },
        { question: 'Yeh kahani kis par vyangya hai?', options: ['Samanti varg', 'Garib varg', 'Kisan varg', 'None'], correctAnswer: 0 }
      ]
    }
  ]
};
