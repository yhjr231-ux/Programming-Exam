let startScreen = document.getElementById("start-screen");
let nameScreen = document.getElementById("name-screen");
let examScreen = document.getElementById("exam-screen");
let resultsScreen = document.getElementById("results-screen");
let practicalScreen = document.getElementById("practical-screen");
let practicalQuestion = document.getElementById("practical-question");
let practicalCodeEditor;
const PASS_PERCENTAGE = 85;
let runCodeButton = document.getElementById("run-code");
let practicalNextButton = document.getElementById("practical-next");
let backToChoice = document.getElementById("backToChoice");
function showBackToChoice() {
    backToChoice.style.display = "block";
}

function hideBackToChoice() {
    backToChoice.style.display = "none";
}
let practicalPreviousButton =
    document.getElementById("practical-previous");
let practicalResult = document.getElementById("practical-result");
let practicalProgress =
    document.getElementById("practical-progress");
function createPracticalEditor() {
CodeMirror.registerHelper("hint", "javascript", function(editor) {

    let cursor = editor.getCursor();

    let line = editor.getLine(cursor.line);

    let textBeforeCursor = line.substring(0, cursor.ch);

    let words = [
        "console",
        "document",
        "window",
        "Math",
        "JSON",
        "function",
        "return",
        "if",
        "else",
        "for",
        "while",
        "const",
        "let",
        "var",
        "true",
        "false"
    ];

    if (textBeforeCursor.endsWith("console.")) {

        return {
    list: [
        {
            text: "console.log()",
            displayText: "log"
        },
        "error",
        "warn",
        "info",
        "clear"
    ],
    from: CodeMirror.Pos(
        cursor.line,
        cursor.ch - "console.".length
    ),
    to: CodeMirror.Pos(
        cursor.line,
        cursor.ch
    )
};
    }

    return {
        list: words,
        from: CodeMirror.Pos(
    cursor.line,
    cursor.ch - "console.".length
),
        to: CodeMirror.Pos(cursor.line, cursor.ch)
    };

});
CodeMirror.registerHelper("hint", "htmlmixed", function(editor) {

    let cursor = editor.getCursor();
    let line = editor.getLine(cursor.line);
    let textBeforeCursor = line.substring(0, cursor.ch);

    if (!textBeforeCursor.endsWith("<")) {
        return;
    }

    let tags = [
        "html",
        "head",
        "body",
        "title",
        "h1",
        "h2",
        "h3",
        "p",
        "div",
        "span",
        "button",
        "input",
        "textarea",
        "img",
        "a",
        "ul",
        "ol",
        "li",
        "table",
        "tr",
        "td",
        "form"
    ];

    return {
        list: tags,
        from: CodeMirror.Pos(
            cursor.line,
            cursor.ch - 1
        ),
        to: CodeMirror.Pos(
            cursor.line,
            cursor.ch
        )
    };
});
    if (!practicalCodeEditor) {

    practicalCodeEditor = CodeMirror.fromTextArea(
        document.getElementById("practical-code"),
        {
            mode: "javascript",
            theme: "material-darker",
            lineNumbers: true,
            indentUnit: 4,
            tabSize: 4,
            lineWrapping: true,
            autoCloseBrackets: true,

            extraKeys: {
                "Ctrl-Space": "autocomplete"
            }
        }
    );

}
practicalCodeEditor.on("inputRead", function (editor, change) {

    if (change.text[0] === "" || change.origin === "setValue") {
        return;
    }

    if (change.text[0] === "<") {

    CodeMirror.showHint(
        editor,
        CodeMirror.hint.htmlmixed,
        {
            completeSingle: false
        }
    );

}
if (practicalCodeEditor.getOption("mode") === "python") {

    CodeMirror.showHint(
        editor,
        CodeMirror.hint.python,
        {
            completeSingle: false
        }
    );

}
if (practicalCodeEditor.getOption("mode") === "javascript") {

    CodeMirror.showHint(
        editor,
        CodeMirror.hint.javascript,
        {
            completeSingle: false
        }
    );

}
if (practicalCodeEditor.getOption("mode") === "css") {

    CodeMirror.showHint(
        editor,
        CodeMirror.hint.css,
        {
            completeSingle: false
        }
    );

}
});
practicalCodeEditor.on("inputRead", function (editor, change) {

    if (change.text[0] !== ">") {
        return;
    }

    let cursor = editor.getCursor();
    let line = editor.getLine(cursor.line);

    let beforeCursor = line.substring(0, cursor.ch);

    let match = beforeCursor.match(/<([a-zA-Z][a-zA-Z0-9]*)>$/);

    if (!match) {
        return;
    }

    let tagName = match[1];
let selfClosingTags = [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
];

if (selfClosingTags.includes(tagName.toLowerCase())) {
    return;
}
    let closingTag = "</" + tagName + ">";

    editor.replaceRange(
        closingTag,
        cursor
    );

    editor.setCursor({
        line: cursor.line,
        ch: cursor.ch
    });
});
CodeMirror.registerHelper("hint", "python", function(editor) {

    let cursor = editor.getCursor();

    let line = editor.getLine(cursor.line);

    let textBeforeCursor = line.substring(0, cursor.ch);

    let words = [
        "print",
        "input",
        "len",
        "range",
        "str",
        "int",
        "float",
        "list",
        "dict",
        "if",
        "elif",
        "else",
        "for",
        "while",
        "def",
        "return",
        "import",
        "from",
        "True",
        "False",
        "None"
    ];

    return {
        list: words,

        from: CodeMirror.Pos(
            cursor.line,
            cursor.ch
        ),

        to: CodeMirror.Pos(
            cursor.line,
            cursor.ch
        )
    };

});
CodeMirror.registerHelper("hint", "css", function(editor) {

    let cursor = editor.getCursor();

    let line = editor.getLine(cursor.line);

    let textBeforeCursor = line.substring(0, cursor.ch);

    let properties = [
        "color",
        "background",
        "background-color",
        "font-size",
        "font-family",
        "font-weight",
        "text-align",
        "text-decoration",
        "width",
        "height",
        "margin",
        "padding",
        "border",
        "border-radius",
        "display",
        "position",
        "top",
        "right",
        "bottom",
        "left",
        "flex",
        "grid"
    ];

    return {
        list: properties,

        from: CodeMirror.Pos(
            cursor.line,
            cursor.ch
        ),

        to: CodeMirror.Pos(
            cursor.line,
            cursor.ch
        )
    };

});
}
let certificateScreen = document.getElementById("certificate-screen");
let finishScreen = document.getElementById("finish-screen");
let goResultsButton = document.getElementById("go-results");
let theoryExamButton = document.getElementById("theory-exam");
let studentNameInput = document.getElementById("student-name");
let enterExamButton = document.getElementById("enter-exam");
let certificateButton = document.getElementById("certificate-button");
let retryResultButton = document.getElementById("retry-result-button");
let downloadCertificateButton =
    document.getElementById("download-certificate");
let studentName = "";
let examType = "";
let examStarted = false;
let examFinished = false;

let examStartTime = 0;
let examEndTime = 0;

let degreeSaver = 0;
let questionNumberSaver = 0;
let practicalQuestionNumber = 0;
let practicalSelectedAnswers = [];
let practicalAnswers = [];
let practicalCodes = [];
let practicalQuestionAnswered = false;
let practicalExamReadyToFinish = false;
let practicalAnsweredCount = 0;
let practicalTimeLeft = 600;
let practicalTimer = document.getElementById("practical-timer");
let practicalTimerInterval = null;
let timer = document.getElementById("timer");
let timeLeft = 600;
timer.textContent = "10:00";
let quizFinished = false;
let progress = document.getElementById("progress");
let preventDuplicateAnswer = false;
let selectedAnswer = null;
let userAnswers = [];
let answeredCount = 0;
let unansweredCount = 0;
let percentage = 0;
let elapsedSeconds = 0;
let passed = false;
let question = document.getElementById("question");
let buttonAnswer1 = document.getElementById("answer1");
let buttonAnswer2 = document.getElementById("answer2");
let buttonAnswer3 = document.getElementById("answer3");
let buttonAnswer4 = document.getElementById("answer4");
let buttonNext = document.getElementById("next-question");
let buttonPrevious = document.getElementById("previous-question");
function runHTMLCode(code) {

    let container = document.createElement("div");

    container.innerHTML = code;

    document.body.appendChild(container);

    let output = container.textContent.trim();

    container.remove();

    return output;
}
function runCSSCode(code) {

    let element = document.createElement("div");

    element.style.cssText = code;

    document.body.appendChild(element);

    let value = "";

    for (let i = 0; i < element.style.length; i++) {

        let property = element.style[i];

        value = element.style.getPropertyValue(property).trim();

        if (value !== "") {
            break;
        }
    }

    element.remove();

    return value;
}
function runJavaScriptCode(code) {
    
    let output = [];

    let consoleForStudent = {
        log: function (value) {
            output.push(String(value));
        }
    };

    let studentCode = new Function(
        "console",
        code
    );

    studentCode(consoleForStudent);

    return output.join("\n");
}
let pyodide = null;
async function loadPython() {

    pyodide = await loadPyodide();

}
loadPython();
async function runPythonCode(code) {

    let output = [];

    pyodide.setStdout({
        batched: function (text) {
            output.push(text);
        }
    });

    await pyodide.runPythonAsync(code);

    return output.join("\n");
}
async function runPracticalCode(code, accessList) {

    if (accessList.language === "JavaScript") {
        return runJavaScriptCode(code);
    }

    if (accessList.language === "Python") {
    return await runPythonCode(code);
}
if (accessList.language === "HTML") {
    return runHTMLCode(code);
}
if (accessList.language === "CSS") {
    return runCSSCode(code);
}
}
runCodeButton.addEventListener("click", async function () {

    let code = practicalCodeEditor.getValue();
    let accessList =
    practicalQuestionList[practicalQuestionNumber];

    practicalResult.textContent = "";

    if (code.trim() === "") {
        practicalResult.textContent = "اكتب كود أولًا...";
        return;
    }

    try {

        let studentOutput =
    await runPracticalCode(code, accessList);
        
        if (studentOutput === accessList.expectedOutput) {

    practicalResult.textContent =
    "الناتج:\n" +
    studentOutput +
    "\n\n✅ إجابة صحيحة!";
        practicalQuestionAnswered = true;
practicalAnswers[practicalQuestionNumber] = true;

} else {

    practicalResult.textContent =
        "الناتج:\n" +
        studentOutput +
        "\n\n❌ إجابة غير صحيحة!" +
        "\n\n💡 الكود المطلوب:\n" +
        accessList.expectedCode;
practicalQuestionAnswered = true;
practicalAnswers[practicalQuestionNumber] = false;
}

    } catch (error) {

        practicalResult.textContent =
            "Error: " + error.message;

    }

});
theoryExamButton.addEventListener("click", function(){

    startScreen.classList.add("hidden");
    nameScreen.classList.remove("hidden");

});
studentNameInput.addEventListener("input", function(){

    if (studentNameInput.value.trim() !== "") {

        enterExamButton.disabled = false;

    } else {

        enterExamButton.disabled = true;

    }

});
enterExamButton.addEventListener("click", function(){

    if (studentNameInput.value.trim() === "") {
        return;
    }

    studentName = studentNameInput.value.trim();

    nameScreen.classList.add("hidden");


    // ==========================================
    // 📚 الامتحان النظري
    // ==========================================

    if (examType === "theory") {

        examScreen.classList.remove("hidden");

        examStarted = true;
        examFinished = false;

        examStartTime = Date.now();

        timeLeft = 600;

        timer.textContent = "10:00";

        showQuestion();

        startTimer();

    }


    // ==========================================
    // 💻 الامتحان العملي
    // ==========================================

    else if (examType === "practical") {

    practicalScreen.classList.remove("hidden");

    createPracticalEditor();

    startPracticalTimer();
    examStartTime = Date.now();

}

});
let questionList = [

    {
        question:"ما هي مراحل تطور التكنولوجيا؟",

        answers: [
            "الاربعينيات و الستينيات, السبعينيات و الثمانينيات, التسعينيات, العقد الاول من الالفية, العقد الثاني من الالفية فصاعدا",
            "الاربيعينيات و الستينيات, العقد الاول من الالفية , التسعينيات",
            "الاربيعينيات و الستينيات, السبعينيات و الثمانينيات, التسعينيات",
            "العقد الثاني من الافية فصاعدا, التعينيات و العقد الثاني من الافية فصاعدا"
        ],

        correctAnswer: 0
    },

    {
        question: "ما التحديات الهندسية و الفيزيائية التي تواجه استمرار زيادة عدد الترانزوستورات في الدوائر المتكاملة",

        answers: [
            "زيادة سرعة المعالج",
            "تحسين جودة الصورة",
            "ظاهرة النفق الكمومي",
            "زيادة سرعة التيار"
        ],

        correctAnswer: 2
    },

    {
        question: "تضيف عناصر ومعلومات رقمية فوق مشهد من العالم الحقيقي تعرف بـ:",

        answers: [
            "الواقع الافتراضي",
            "الواقع المعزز (AR)",
            "الحوسبة الكمومية",
            "الحوسبة السحابية"
        ],

        correctAnswer: 1
    },

    {
        question: "الأسلوب الذي يندرج ضمن التعلم الآلي ويعتمد على شبكات عصبية اصطناعية متعددة الطبقات هو:",

        answers: [
            "التعلم العميق",
            "التشفير المتماثل",
            "التجارة الإلكترونية",
            "البرمجة الخطية"
        ],

        correctAnswer: 0
    },

    {
        question: "استخدام الذكاء الاصطناعي للتنبؤ بأعطال الآلات والمعدات في المصانع قبل وقوعها يُمثل:",

        answers: [
            "الترجمة الآلية",
            "التعرف على الوجه",
            "الصيانة التنبؤية",
            "تحسين مسارات التوصيل"
        ],

        correctAnswer: 2
    },

    {
        question: "التقنية التي تتيح للبشر فهم العوامل والأسباب التي أدت إلى قرار الذكاء الاصطناعي تسمى:",

        answers: [
            "الحوسبة الطرفية",
            "الصندوق الأسود",
            "التعلم غير الخطي",
            "الذكاء الاصطناعي القابل للتفسير (XAI)"
        ],

        correctAnswer: 3
    },

    {
        question: "ظهرت الحواسيب الإلكترونية الأولى مثل ENIAC واستخدمت أساسًا للأغراض العسكرية والعلمية في حقبة:",

        answers: [
            "التسعينيات",
            "السبعينيات والثمانينيات",
            "الأربعينيات إلى الستينيات",
            "العقد الأول من الألفية"
        ],

        correctAnswer: 2
    },

    {
        question: "انحراف أو نمط في مخرجات الذكاء الاصطناعي يؤدي لنتائج غير عادلة بسبب بيانات التدريب يُعرف بـ:",

        answers: [
            "التحيز الخوارزمي",
            "التراكب الكمي",
            "التفكير التصميمي",
            "استئصال التهديد"
        ],

        correctAnswer: 0
    },

    {
        question: "أي مما يلي يُعد نظامًا يتنبأ بتفضيلات المستخدم بناءً على سلوكه السابق ويعرض اقتراحات مخصصة؟",

        answers: [
            "جدار الحماية",
            "نظام التوصية",
            "واجهة برمجة التطبيقات",
            "المخطط الهيكلي"
        ],

        correctAnswer: 1
    },
    {
        question: "أداء الشخص لمهامه الوظيفية من المنزل أو من موقع بعيد بالاعتماد على الإنترنت يسمى:",

        answers: [
            "التجارة الإلكترونية",
            "العمل عن بعد",
            "الحوسبة الطرفية",
            "التعلم العميق"
        ],

        correctAnswer: 1
    },

    {
        question: "النموذج الحاسوبي المستوحى بصورة مبسطة من فكرة ترابط الخلايا العصبية وتتغير أوزانه أثناء التدريب هو:",

        answers: [
            "الصمام المفرغ",
            "المعالج أحادي النواة",
            "الشبكة العصبية الاصطناعية (ANN)",
            "الكيوبت الكلاسيكي"
        ],

        correctAnswer: 2
    },

    {
        question: "في مجال الرعاية الصحية، يستخدم الذكاء الاصطناعي في:",

        answers: [
            "التشخيص بالصور ودعم اكتشاف الأدوية",
            "أتمتة فحص خطوط الإنتاج",
            "التنبؤ بمواعيد الحصاد",
            "توجيه شاحنات النقل"
        ],

        correctAnswer: 0
    },

    {
        question: "تحديد الجهات المسؤولة عن النظام وقراراته وآثاره وإمكان محاسبتها وفق أدوارها يعبر عن مبدأ:",

        answers: [
            "الشفافية",
            "الخصوصية",
            "العدالة",
            "المساءلة (Accountability)"
        ],

        correctAnswer: 3
    },

    {
        question: "معالجة البيانات فورًا على الجهاز نفسه بدلاً من إرسالها إلى السحابة لتقليل زمن الاستجابة يُعرف بـ:",

        answers: [
            "الحوسبة الطرفية",
            "الحوسبة الكمومية",
            "التجارة الإلكترونية",
            "التعلم التوليدي"
        ],

        correctAnswer: 0
    },

    {
        question: "أي التطبيقات التالية يُعد مثالًا على الذكاء الاصطناعي التوليدي (GenAI)؟",

        answers: [
            "مرشح البريد المزعج",
            "أدوات ChatGPT وتوليد الصور",
            "قارئ الباركود",
            "مستشعر الحرارة"
        ],

        correctAnswer: 1
    },

    {
        question: "تعد الملاحظة التجريبية الخاصة بتضاعف الترانزستورات كل عامين مقيدة بتحديات فيزيائية منها:",

        answers: [
            "قلة سرعة المعالجات",
            "ازدياد تيارات التسرب وتأثيرات النفق الكمومي",
            "انعدام استخدام السحابة",
            "انتشار الشاشات اللمسية"
        ],

        correctAnswer: 1
    },
        {
        question: "نمط تعليمي تقدم فيه المواد الدراسية والشروحات والاختبارات عبر شبكة الإنترنت يعرف بـ:",

        answers: [
            "التعلم عبر الإنترنت",
            "الحوسبة الطرفية",
            "القيادة الذاتية",
            "الواقع الافتراضي"
        ],

        correctAnswer: 0
    },

    {
        question: "المجال الشامل الذي يضم أنظمة حاسوبية قادرة على محاكاة السلوك البشري الذكي هو:",

        answers: [
            "التعلم العميق",
            "الذكاء الاصطناعي (AI)",
            "التعلم الآلي",
            "الذكاء التوليدي"
        ],

        correctAnswer: 1
    },

    {
        question: "كشف وجوه الأشخاص والتعرف عليها تلقائيًا لفتح الهاتف أو التحقق من الهوية يُسمى:",

        answers: [
            "الصيانة التنبؤية",
            "التعرف على الوجه",
            "التوصية بالمحتوى",
            "الترجمة الآلية"
        ],

        correctAnswer: 1
    },

    {
        question: "من الممارسات التي تتطلب حذرًا شديدًا عند استخدام الذكاء الاصطناعي:",

        answers: [
            "تصنيف الصور والأنماط",
            "الاستدلال الاحتمالي",
            "القرارات الأخلاقية والتعامل مع البيانات الشخصية الحساسة",
            "التنبؤ الرياضي البسيط"
        ],

        correctAnswer: 2
    },

    {
        question: "يعتمد تحسين أداء المعالجات الحديثة كبديل لتصغير الترانزستورات على:",

        answers: [
            "الصمامات المفرغة",
            "تعدد الأنوية والمعالجة المتوازية",
            "تقليل سعة الذاكرة",
            "إلغاء الكهرباء"
        ],

        correctAnswer: 1
    },

    {
        question: "عند استخدام نظام ذكاء اصطناعي في كاميرات المراقبة لتتبع المواطنين، فإن المبدأ الأكثر ارتباطًا بمخاوف الجمهور هو:",

        answers: [
            "حماية الخصوصية",
            "سرعة المعالجة",
            "قوة السحابة",
            "التراكب الكمي"
        ],

        correctAnswer: 0
    },

    {
        question: "ما الذي يجعل التحقق البشري إلزاميًا لمخرجات الذكاء الاصطناعي التوليدي؟",

        answers: [
            "خطر توليد معلومات خاطئة أو غير مدعومة تبدو مقنعة (الهلوسة)",
            "استهلاك النظام للطاقة",
            "عدم اتصال الحواسيب بالكهرباء",
            "كفاءة لغات البرمجة"
        ],

        correctAnswer: 0
    },
        {
        question: "إتاحة الإنترنت للاستخدام التجاري وظهور الويب والبريد الإلكتروني للجمهور كان في حقبة:",

        answers: [
            "الأربعينيات",
            "الستينيات",
            "التسعينيات",
            "العقد الثاني من الألفية"
        ],

        correctAnswer: 2
    },

    {
        question: "منصات تتيح للمستخدمين التواصل ونشر المحتوى ومشاركته والتفاعل السريع تعرف بـ:",

        answers: [
            "شبكات التواصل الاجتماعي",
            "التجارة الإلكترونية",
            "الحوسبة السحابية",
            "النظم الخبيرة"
        ],

        correctAnswer: 0
    },

    {
        question: "تصنيف رسائل البريد الإلكتروني المزعجة تلقائيًا يُعد مثالًا على:",

        answers: [
            "التعلم الآلي",
            "الواقع الافتراضي",
            "الحوسبة الطرفية",
            "التعلم التوليدي المعقد"
        ],

        correctAnswer: 0
    },

    {
        question: "تحسين مسارات سيارات الشحن والتوصيل لتقليل زمن الرحلات يمثل استخدام الذكاء الاصطناعي في:",

        answers: [
            "الخدمات اللوجستية",
            "الرعاية الصحية",
            "التعليم الإلكتروني",
            "الزراعة الحيوية"
        ],

        correctAnswer: 0
    },

    {
        question: "عندما يعجز المطورون عن توضيح وتفسير كيفية وصول النموذج إلى حكم معين، فإن هذه الحالة تعرف بـ:",

        answers: [
            "مشكلة الصندوق الأسود",
            "الهلوسة",
            "التحيز المباشر",
            "التراكب الكمي"
        ],

        correctAnswer: 0
    },

    {
        question: "أي المبادئ الأخلاقية التالية يلزم المؤسسات بحماية البيانات الحساسة وعدم إساءة استخدامها؟",

        answers: [
            "حماية الخصوصية",
            "الشفافية",
            "تعدد الأنوية",
            "المعالجة المتوازية"
        ],

        correctAnswer: 0
    },

    {
        question: "تتفوق السيارات ذاتية القيادة في إدراك محيطها واتخاذ القرارات من خلال دمج الذكاء الاصطناعي مع:",

        answers: [
            "الكاميرات والمستشعرات والحوسبة الطرفية",
            "الصمامات المفرغة",
            "بطاقات الدفع الذكية",
            "نصوص الويب"
        ],

        correctAnswer: 0
    },
        {
        question: "إتاحة موارد تكنولوجيا المعلومات كخدمات برمجية وتخزينية عبر الإنترنت يُعرف بـ:",

        answers: [
            "الحوسبة السحابية",
            "الحوسبة الطرفية",
            "الشبكة العصبية",
            "الواقع المعزز"
        ],

        correctAnswer: 0
    },

    {
        question: "الأنظمة التي تنشئ نصوصًا وصورًا ومقاطع صوتية جديدة بناءً على أنماط تدربت عليها تصنف كـ:",

        answers: [
            "الحواسب الشخصية",
            "الذكاء الاصطناعي التوليدي (GenAI)",
            "أنظمة التوصية البسيطة",
            "مرشحات الرسائل"
        ],

        correctAnswer: 1
    },

    {
        question: "استخدام الذكاء الاصطناعي في الزراعة يفيد بشكل مباشر في:",

        answers: [
            "التنبؤ بموعد الحصاد والكشف عن الآفات والأمراض",
            "تشخيص كسور العظام",
            "فتح قفل الهاتف",
            "ترجمة النصوص الفورية"
        ],

        correctAnswer: 0
    },

    {
        question: "إتاحة معلومات واضحة ومناسبة للمستخدمين عن آلية عمل النظام وحدوده وعملية اتخاذ القرار يسمى:",

        answers: [
            "المساءلة",
            "الشفافية (Transparency)",
            "الصندوق الأسود",
            "التحيز الخوارزمي"
        ],

        correctAnswer: 1
    },

    {
        question: "نظام الدفع الذي يعتمد على البطاقات المصرفية أو تطبيقات الهاتف ورموز QR يُطلق عليه:",

        answers: [
            "الدفع غير النقدي",
            "العمل عن بعد",
            "الحوسبة الكمومية",
            "التجارة التقليدية"
        ],

        correctAnswer: 0
    },

    {
        question: "ما الذي يميز الكيوبت في الحوسبة الكمومية عن البت الكلاسيكي؟",

        answers: [
            "يعمل فقط بقيمة صفر",
            "يمكنه الاستفادة من مبدأ التراكب الكمي لتمثيل مزيج من 0 و1 في نفس الوقت",
            "يتطلب صمامات مفرغة",
            "يعمل كبرنامج تواصل اجتماعي"
        ],

        correctAnswer: 1
    },

    {
        question: "عند اختيار متغير بديل يمثل بشكل غير مباشر سمة محمية مثل العرق أو الجنس، فإن هذا قد يؤدي إلى:",

        answers: [
            "زيادة سرعة المعالجة",
            "دخول التحيز الخوارزمي في مخرجات النظام",
            "تحسين دقة الشبكة العصبية",
            "تفعيل الحوسبة الطرفية"
        ],

        correctAnswer: 1
    }
];
let questionBank = [

    // =========================
    // JavaScript - Choice
    // =========================

    {
        language: "JavaScript",
        type: "choice",
        question: "أي أمر يُستخدم لطباعة نص في وحدة التحكم؟",
        options: [
            "console.log()",
            "console.print()",
            "print.console()",
            "log.console()"
        ],
        correctAnswer: 0
    },

    // =========================
    // JavaScript - Code
    // =========================

    {
        language: "JavaScript",
        type: "code",
        question: "اكتب برنامج يطبع في وحدة التحكم كلمة Hello",
        expectedOutput: "Hello",
        expectedCode: 'console.log("Hello");'
    },

    // =========================
    // JavaScript - Output
    // =========================

    {
        language: "JavaScript",
        type: "choice",
        question: "ما الناتج من الكود التالي؟\n\nconsole.log(5 + 3);",
        options: [
            "53",
            "8",
            "15",
            "Error"
        ],
        correctAnswer: 1
    },

    // =========================
    // JavaScript - Fix
    // =========================

    {
        language: "JavaScript",
        type: "code",
        question: "صحح الكود التالي ليطبع كلمة Hello:\n\nconsole.log(Hello);",
        expectedOutput: "Hello",
        expectedCode: 'console.log("Hello");'
    },

    // =========================
    // Python - Choice
    // =========================

    {
        language: "Python",
        type: "choice",
        question: "أي أمر يُستخدم لطباعة نص في Python؟",
        options: [
            "console.log()",
            "print()",
            "echo()",
            "write()"
        ],
        correctAnswer: 1
    },

    // =========================
    // Python - Code
    // =========================

    {
        language: "Python",
        type: "code",
        question: "اكتب برنامجًا يطبع كلمة Hello",
        expectedOutput: "Hello",
        expectedCode: 'print("Hello")'
    },

    // =========================
    // HTML - Choice
    // =========================

    {
        language: "HTML",
        type: "choice",
        question: "أي وسم يُستخدم لإنشاء عنوان رئيسي؟",
        options: [
            "<p>",
            "<h1>",
            "<title>",
            "<header>"
        ],
        correctAnswer: 1
    },

    // =========================
    // HTML - Code
    // =========================

    {
        language: "HTML",
        type: "code",
        question: "اكتب كود HTML يعرض كلمة Hello كعنوان رئيسي",
        expectedOutput: "Hello",
        expectedCode: "<h1>Hello</h1>"
    },

    // =========================
    // CSS - Choice
    // =========================

    {
        language: "CSS",
        type: "choice",
        question: "أي خاصية تُستخدم لتغيير لون النص؟",
        options: [
            "background",
            "font-size",
            "color",
            "text-style"
        ],
        correctAnswer: 2
    },

    // =========================
    // CSS - Code
    // =========================

    {
        language: "CSS",
        type: "code",
        question: "اكتب CSS يجعل لون النص أحمر",
        expectedOutput: "red",
        expectedCode: "color: red;"
    },
    {
    language: "JavaScript",
    type: "code",
    question: "اكتب كود يطبع الرقم 10 في وحدة التحكم",
    expectedOutput: "10",
    expectedCode: "console.log(10);"
},

{
    language: "JavaScript",
    type: "choice",
    question: "ما الناتج من الكود التالي؟\n\nconsole.log(10 - 4);",
    options: [
        "6",
        "14",
        "104",
        "Error"
    ],
    correctAnswer: 0
},

{
    language: "JavaScript",
    type: "code",
    question: "صحح الكود التالي ليطبع الرقم 8:\n\nconsole.log(5 + 2);",
    expectedOutput: "8",
    expectedCode: "console.log(5 + 3);"
},

{
    language: "Python",
    type: "code",
    question: "اكتب برنامجًا يطبع الرقم 20",
    expectedOutput: "20",
    expectedCode: "print(20)"
},

{
    language: "Python",
    type: "choice",
    question: "ما الناتج من الكود التالي؟\n\nprint(3 + 4)",
    options: [
        "34",
        "7",
        "12",
        "Error"
    ],
    correctAnswer: 1
},

{
    language: "Python",
    type: "code",
    question: "صحح الكود التالي ليطبع كلمة Hello:\n\nprint(Hello)",
    expectedOutput: "Hello",
    expectedCode: 'print("Hello")'
},

{
    language: "HTML",
    type: "choice",
    question: "أي وسم يُستخدم لإنشاء فقرة نصية؟",
    options: [
        "<h1>",
        "<p>",
        "<div>",
        "<span>"
    ],
    correctAnswer: 1
},

{
    language: "HTML",
    type: "code",
    question: "اكتب كود HTML يعرض كلمة Welcome داخل فقرة",
    expectedOutput: "Welcome",
    expectedCode: "<p>Welcome</p>"
},

{
    language: "CSS",
    type: "choice",
    question: "أي خاصية تُستخدم لتغيير حجم الخط؟",
    options: [
        "color",
        "font-size",
        "background",
        "text-align"
    ],
    correctAnswer: 1
},

{
    language: "CSS",
    type: "code",
    question: "اكتب CSS يجعل لون خلفية العنصر أزرق",
    expectedOutput: "blue",
    expectedCode: "background-color: blue;"
},
{
    language: "JavaScript",
    type: "choice",
    question: "ما الناتج من الكود التالي؟\n\nlet x = 5;\nconsole.log(x * 2);",
    options: [
        "7",
        "10",
        "25",
        "52"
    ],
    correctAnswer: 1
},

{
    language: "JavaScript",
    type: "code",
    question: "أكمل الكود ليطبع الرقم 15:\n\nlet x = 10;\nconsole.log(_____);",
    expectedOutput: "15",
    expectedCode: "let x = 10;\nconsole.log(x + 5);"
},

{
    language: "JavaScript",
    type: "choice",
    question: "ما الناتج من الكود التالي؟\n\nconsole.log(2 + 3 * 4);",
    options: [
        "20",
        "14",
        "24",
        "9"
    ],
    correctAnswer: 1
},

{
    language: "Python",
    type: "choice",
    question: "ما الناتج من الكود التالي؟\n\nx = 10\nprint(x - 3)",
    options: [
        "7",
        "13",
        "103",
        "Error"
    ],
    correctAnswer: 0
},

{
    language: "Python",
    type: "complete",
    question: "أكمل الكود ليطبع الرقم 20:\n\nx = 10\nprint(_____)",
    starterCode: "x = 10\nprint()",
    expectedOutput: "20",
    expectedCode: "x = 10\nprint(x * 2)"
},

{
    language: "Python",
    type: "choice",
    question: "ما الكلمة المستخدمة لإنشاء شرط في Python？",
    options: [
        "if",
        "check",
        "condition",
        "when"
    ],
    correctAnswer: 0
},

{
    language: "HTML",
    type: "code",
    question: "أكمل الكود ليعرض كلمة Hello كعنوان من المستوى الثاني",
    expectedOutput: "Hello",
    expectedCode: "<h2>Hello</h2>"
},

{
    language: "HTML",
    type: "choice",
    question: "أي وسم يُستخدم لإنشاء رابط؟",
    options: [
        "<link>",
        "<a>",
        "<url>",
        "<href>"
    ],
    correctAnswer: 1
},

{
    language: "CSS",
    type: "choice",
    question: "ما الخاصية التي تُستخدم لتغيير لون خلفية العنصر؟",
    options: [
        "color",
        "background-color",
        "font-color",
        "background-text"
    ],
    correctAnswer: 1
},

{
    language: "CSS",
    type: "code",
    question: "اكتب CSS يجعل حجم الخط 20px",
    expectedOutput: "20px",
    expectedCode: "font-size: 20px;"
},
{
    language: "JavaScript",
    type: "code",
    question: "اكتب كود يطبع كلمة JavaScript في وحدة التحكم",
    expectedOutput: "JavaScript",
    expectedCode: 'console.log("JavaScript");'
},

{
    language: "JavaScript",
    type: "choice",
    question: "ما الناتج من الكود التالي؟\n\nlet x = 4;\nlet y = 6;\nconsole.log(x + y);",
    options: [
        "10",
        "24",
        "46",
        "2"
    ],
    correctAnswer: 0
},

{
    language: "Python",
    type: "code",
    question: "اكتب برنامجًا يطبع نتيجة 5 × 3",
    expectedOutput: "15",
    expectedCode: "print(5 * 3)"
},

{
    language: "Python",
    type: "choice",
    question: "ما الناتج من الكود التالي؟\n\nx = 8\nprint(x + 2)",
    options: [
        "6",
        "10",
        "16",
        "82"
    ],
    correctAnswer: 1
},

{
    language: "HTML",
    type: "code",
    question: "اكتب كود HTML يعرض كلمة Hello داخل عنصر div",
    expectedOutput: "Hello",
    expectedCode: "<div>Hello</div>"
},

{
    language: "HTML",
    type: "choice",
    question: "أي وسم يُستخدم لإضافة صورة في صفحة HTML؟",
    options: [
        "<image>",
        "<picture>",
        "<img>",
        "<src>"
    ],
    correctAnswer: 2
},

{
    language: "CSS",
    type: "code",
    question: "اكتب CSS يجعل عرض العنصر 100px",
    expectedOutput: "100px",
    expectedCode: "width: 100px;"
}

];
let practicalQuestionList = [...questionBank];
practicalQuestionList.sort(function () {
    return Math.random() - 0.5;
});
function showPracticalQuestion() {

    let accessList =
    practicalQuestionList[practicalQuestionNumber];
    if (practicalCodeEditor) {
    practicalCodeEditor.setValue(
        practicalCodes[practicalQuestionNumber] !== undefined
            ? practicalCodes[practicalQuestionNumber]
            : (accessList.starterCode || "")
    );
}
    practicalQuestionAnswered =
    practicalAnswers[practicalQuestionNumber] !== undefined;
practicalResult.textContent = "";
    let questionParts = accessList.question.split("\n\n");

practicalQuestion.innerHTML = "";

let questionText = document.createElement("div");

questionText.textContent = questionParts[0];

practicalQuestion.appendChild(questionText);

if (questionParts.length > 1) {

    let codeBox = document.createElement("pre");

    codeBox.textContent = questionParts
        .slice(1)
        .join("\n\n");

    practicalQuestion.appendChild(codeBox);
}

practicalQuestion.style.direction = "rtl";
practicalProgress.textContent =
    "السؤال " +
    (practicalQuestionNumber + 1) +
    " من " +
    practicalQuestionList.length;
    document.getElementById("practical-language").textContent =
        accessList.language;
if (practicalCodeEditor) {

    if (accessList.language === "JavaScript") {
        practicalCodeEditor.setOption("mode", "javascript");
    }

    if (accessList.language === "Python") {
        practicalCodeEditor.setOption("mode", "python");
    }

    if (accessList.language === "HTML") {
        practicalCodeEditor.setOption("mode", "htmlmixed");
    }

    if (accessList.language === "CSS") {
        practicalCodeEditor.setOption("mode", "css");
    }
}
    let practicalOptions =
        document.getElementById("practical-options");

    practicalOptions.innerHTML = "";
selectedAnswer =
    practicalAnswers[practicalQuestionNumber] !== undefined
        ? practicalAnswers[practicalQuestionNumber]
        : null;
    if (accessList.type === "choice") {

        document.getElementById("practical-content").style.display = "none";

        practicalResult.textContent = "";

         accessList.options.forEach(function (option, index) {

    let button = document.createElement("button");

    button.textContent = option;

    button.addEventListener("click", function () {

        let allOptions =
            practicalOptions.querySelectorAll("button");

        allOptions.forEach(function (optionButton) {

            optionButton.classList.remove("button-selected");

        });

        button.classList.add("button-selected");

        selectedAnswer = index;

practicalSelectedAnswers[practicalQuestionNumber] = index;

practicalResult.textContent = "";
practicalQuestionAnswered = true;
    });

    practicalOptions.appendChild(button);
if (practicalSelectedAnswers[practicalQuestionNumber] === index) {
    button.classList.add("button-selected");
}
});

    } else {

        document.getElementById("practical-content").style.display = "block";

    }

}
showPracticalQuestion();
function startPracticalTimer() {

    clearInterval(practicalTimerInterval);

    practicalTimeLeft = 600;

    practicalTimer.textContent = "10:00";

    practicalTimerInterval = setInterval(function() {

        if (practicalTimeLeft > 0) {

            practicalTimeLeft--;

        }

        let minutes = Math.floor(practicalTimeLeft / 60);

        let seconds = practicalTimeLeft % 60;

        practicalTimer.textContent =
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0");
if (practicalTimeLeft === 0) {

    clearInterval(practicalTimerInterval);

    practicalResult.textContent =
        "⏰ انتهى وقت الامتحان العملي";

}
    }, 1000);

}
function showQuestion() {

    let accessList = questionList[questionNumberSaver];

    question.textContent = accessList.question;

    buttonAnswer1.textContent = accessList.answers[0];

    buttonAnswer2.textContent = accessList.answers[1];

    buttonAnswer3.textContent = accessList.answers[2];

    buttonAnswer4.textContent = accessList.answers[3];

    progress.textContent = "السؤال " + (questionNumberSaver + 1) + " من " + questionList.length;

    // استرجاع الإجابة السابقة
    buttonAnswer1.classList.toggle(
        "button-selected",
        selectedAnswer === 0
    );

    buttonAnswer2.classList.toggle(
        "button-selected",
        selectedAnswer === 1
    );

    buttonAnswer3.classList.toggle(
        "button-selected",
        selectedAnswer === 2
    );

    buttonAnswer4.classList.toggle(
        "button-selected",
        selectedAnswer === 3
    );

}
showQuestion();
buttonAnswer1.addEventListener("click", function(){

    if (quizFinished === true) {
        return;
    }
selectedAnswer = 0;
userAnswers[questionNumberSaver] = 0;
    buttonAnswer1.classList.add("button-selected");

    buttonAnswer2.classList.remove("button-selected");
    buttonAnswer3.classList.remove("button-selected");
    buttonAnswer4.classList.remove("button-selected");

});


buttonAnswer2.addEventListener("click", function(){

    if (quizFinished === true) {
        return;
    }
selectedAnswer = 1;
userAnswers[questionNumberSaver] = 1;
    buttonAnswer2.classList.add("button-selected");

    buttonAnswer1.classList.remove("button-selected");
    buttonAnswer3.classList.remove("button-selected");
    buttonAnswer4.classList.remove("button-selected");

});


buttonAnswer3.addEventListener("click", function(){

    if (quizFinished === true) {
        return;
    }
selectedAnswer = 2;
userAnswers[questionNumberSaver] = 2;
    buttonAnswer3.classList.add("button-selected");

    buttonAnswer1.classList.remove("button-selected");
    buttonAnswer2.classList.remove("button-selected");
    buttonAnswer4.classList.remove("button-selected");

});


buttonAnswer4.addEventListener("click", function(){

    if (quizFinished === true) {
        return;
    }
selectedAnswer = 3;
userAnswers[questionNumberSaver] = 3;
    buttonAnswer4.classList.add("button-selected");

    buttonAnswer1.classList.remove("button-selected");
    buttonAnswer2.classList.remove("button-selected");
    buttonAnswer3.classList.remove("button-selected");

});

buttonNext.addEventListener("click", function(){

    if (quizFinished === true) {
        return;
    }

    // لو مفيش إجابة مختارة
    

   

    // لو لسه فيه أسئلة
    if (questionNumberSaver < questionList.length - 1) {

        questionNumberSaver++;

        selectedAnswer = null;

        buttonAnswer1.classList.remove("button-selected");
        buttonAnswer2.classList.remove("button-selected");
        buttonAnswer3.classList.remove("button-selected");
        buttonAnswer4.classList.remove("button-selected");

        showQuestion();

    } else {

        quizFinished = true;

        examFinished = true;

        examEndTime = Date.now();

        clearInterval(timerInterval);

       examScreen.classList.add("hidden");

finishScreen.classList.remove("hidden");
    }
});
buttonPrevious.addEventListener("click", function () {

    if (questionNumberSaver > 0) {

        questionNumberSaver--;

        selectedAnswer = userAnswers[questionNumberSaver] ?? null;

        showQuestion();
    }

});
let timerInterval = null;

function startTimer() {

    clearInterval(timerInterval);

    timer.textContent = "05:00";

    timerInterval = setInterval(function() {

        if (timeLeft > 0) {

            timeLeft--;

        }

        let minutes = Math.floor(timeLeft / 60);

        let seconds = timeLeft % 60;

        timer.textContent =
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0");

        if (timeLeft === 0) {

    clearInterval(timerInterval);

    finishExam();

}

    }, 1000);

}
function finishExam() {

    if (examFinished === true) {
        return;
    }

    examFinished = true;
    quizFinished = true;

    examEndTime = Date.now();

    clearInterval(timerInterval);

    examScreen.classList.add("hidden");

    finishScreen.classList.remove("hidden");
}
function calculatePracticalResults() {

    let correctAnswers = 0;

    for (let i = 0; i < practicalAnswers.length; i++) {

        if (practicalAnswers[i] === true) {

            correctAnswers++;

        }

    }

    let totalQuestions =
        practicalQuestionList.length;

    let wrongAnswers =
        totalQuestions - correctAnswers;

    let practicalPercentage =
        (correctAnswers / totalQuestions) * 100;

    return {
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers,
        percentage: practicalPercentage
    };

}
goResultsButton.addEventListener("click", function() {
if (examType === "practical") {

    let practicalResults =
        calculatePracticalResults();
let practicalElapsedSeconds =
    Math.floor((Date.now() - examStartTime) / 1000);
    document.getElementById("final-time").textContent =
    Math.floor(practicalElapsedSeconds / 60) +
    ":" +
    String(practicalElapsedSeconds % 60).padStart(2, "0");
    finishScreen.classList.add("hidden");

    resultsScreen.classList.remove("hidden");

    document.getElementById("result-name").textContent =
        studentName;

    document.getElementById("final-degree").textContent =
        practicalResults.correctAnswers +
        " / " +
        practicalQuestionList.length;

    document.getElementById("final-percentage").textContent =
        practicalResults.percentage + "%";

    document.getElementById("answered-count").textContent =
        practicalQuestionList.length;

    document.getElementById("unanswered-count").textContent =
        practicalResults.wrongAnswers;
        if (practicalResults.percentage >= PASS_PERCENTAGE) {

    document.getElementById("pass-status").textContent = "ناجح";

    certificateButton.style.display = "block";
    retryResultButton.style.display = "none";

} else {

    document.getElementById("pass-status").textContent = "راسب";

    certificateButton.style.display = "none";
    retryResultButton.style.display = "block";

}
 if (practicalResults.percentage >= PASS_PERCENTAGE){

    document.getElementById("pass-status").textContent =
        "ناجح";

    document.getElementById("certificate-button").style.display =
        "block";

    document.getElementById("retry-result-button").style.display =
        "none";

} else {

    document.getElementById("pass-status").textContent =
        "راسب";

    document.getElementById("certificate-button").style.display =
        "none";

    document.getElementById("retry-result-button").style.display =
        "block";
}
    return;

}
    calculateResults();

    finishScreen.classList.add("hidden");

    resultsScreen.classList.remove("hidden");

    showResults();

});
function showResults() {

    let resultName = document.getElementById("result-name");
    let finalDegree = document.getElementById("final-degree");
    let finalPercentage = document.getElementById("final-percentage");
    let finalTime = document.getElementById("final-time");
    let answeredCountElement = document.getElementById("answered-count");
    let unansweredCountElement = document.getElementById("unanswered-count");
    let passStatus = document.getElementById("pass-status");

    let certificateButton = document.getElementById("certificate-button");
    let retryResultButton = document.getElementById("retry-result-button");

    resultName.textContent = studentName;

    finalDegree.textContent =
        degreeSaver + " / " + questionList.length;

    finalPercentage.textContent =
        percentage + "%";

    let minutes = Math.floor(elapsedSeconds / 60);
    let seconds = elapsedSeconds % 60;

    finalTime.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");

    answeredCountElement.textContent =
        answeredCount;

    unansweredCountElement.textContent =
        unansweredCount;

    if (passed === true) {

        passStatus.textContent = "ناجح";

        certificateButton.style.display = "block";
        retryResultButton.style.display = "none";

    } else {

        passStatus.textContent = "راسب";

        certificateButton.style.display = "none";
        retryResultButton.style.display = "block";

    }

}
function calculateResults() {

    degreeSaver = 0;
    answeredCount = 0;

    for (let i = 0; i < questionList.length; i++) {

        if (userAnswers[i] !== undefined) {

            answeredCount++;

            if (userAnswers[i] === questionList[i].correctAnswer) {
                degreeSaver++;
            }

        }

    }

    unansweredCount = questionList.length - answeredCount;

    percentage = Math.round(
        (degreeSaver / questionList.length) * 100
    );

    elapsedSeconds = Math.floor(
        (examEndTime - examStartTime) / 1000
    );

    if (elapsedSeconds > 600) {
        elapsedSeconds = 600;
    }

    passed = percentage >= PASS_PERCENTAGE;

}
certificateButton.addEventListener("click", function() {

    let certificateName =
        document.getElementById("certificate-name");

    let certificateDegree =
        document.getElementById("certificate-degree");

    let certificatePercentage =
        document.getElementById("certificate-percentage");

    let certificateDate =
        document.getElementById("certificate-date");

    certificateName.textContent = studentName;

    if (examType === "practical") {

        let practicalResults =
            calculatePracticalResults();

        certificateDegree.textContent =
            practicalResults.correctAnswers +
            " / " +
            practicalQuestionList.length;

        certificatePercentage.textContent =
            practicalResults.percentage + "%";

    } else {

        certificateDegree.textContent =
            degreeSaver +
            " / " +
            questionList.length;

        certificatePercentage.textContent =
            percentage + "%";
    }

    certificateDate.textContent =
        new Date().toLocaleDateString("ar-EG");

    resultsScreen.classList.add("hidden");

    certificateScreen.classList.remove("hidden");

});
retryResultButton.addEventListener("click", function() {

    if (examType === "practical") {

        practicalQuestionNumber = 0;
        practicalAnswers = [];
        practicalQuestionAnswered = false;
        practicalExamReadyToFinish = false;
        practicalAnsweredCount = 0;
        practicalTimeLeft = 600;

        examFinished = false;
        examStarted = true;

        examStartTime = Date.now();

        resultsScreen.classList.add("hidden");

        practicalScreen.classList.remove("hidden");

        showPracticalQuestion();

        return;
    }

    degreeSaver = 0;

    questionNumberSaver = 0;

    selectedAnswer = null;

    userAnswers = [];

    answeredCount = 0;

    unansweredCount = 0;

    percentage = 0;

    elapsedSeconds = 0;

    passed = false;

    quizFinished = false;

    examFinished = false;

    examStarted = true;

    timeLeft = 600;

    examStartTime = Date.now();

    buttonAnswer1.classList.remove("button-selected");
    buttonAnswer2.classList.remove("button-selected");
    buttonAnswer3.classList.remove("button-selected");
    buttonAnswer4.classList.remove("button-selected");

    resultsScreen.classList.add("hidden");

    examScreen.classList.remove("hidden");

    showQuestion();

    startTimer();

});
downloadCertificateButton.addEventListener("click", function() {

    let certificate = document.querySelector(".certificate");

    let options = {
        margin: 0,
        filename: studentName + " - شهادة الامتحان.pdf",

        image: {
            type: "jpeg",
            quality: 1
        },

        html2canvas: {
            scale: 2,
            useCORS: true
        },

        jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "landscape"
        }
    };

    html2pdf()
        .set(options)
        .from(certificate)
        .save();

});
theoryExamButton.addEventListener("click", function(){

    examType = "theory";

    startScreen.classList.add("hidden");
    nameScreen.classList.remove("hidden");

    showBackToChoice();

});
let practicalExamButton = document.getElementById("practical-exam");

practicalExamButton.addEventListener("click", function(){

    examType = "practical";

    startScreen.classList.add("hidden");
    nameScreen.classList.remove("hidden");

    showBackToChoice();

});
practicalNextButton.addEventListener("click", function () {

    let accessList =
        practicalQuestionList[practicalQuestionNumber];
        if (practicalCodeEditor) {
    practicalCodes[practicalQuestionNumber] =
        practicalCodeEditor.getValue();
}
if (practicalExamReadyToFinish === true) {

    practicalScreen.classList.add("hidden");

    finishScreen.classList.remove("hidden");

    return;

}
    // لازم السؤال يكون اتجاوب عليه
    

    // سؤال الاختيار
    if (accessList.type === "choice") {

        if (selectedAnswer === accessList.correctAnswer) {

            practicalResult.textContent =
                "✅ إجابة صحيحة!";

            practicalAnswers[practicalQuestionNumber] = true;

        } else {

            practicalResult.textContent =
                "❌ إجابة غير صحيحة!";

            practicalAnswers[practicalQuestionNumber] = false;

        }

    }
practicalAnsweredCount++;
    // هل وصلنا لآخر سؤال؟
    if (
    practicalQuestionNumber ===
    practicalQuestionList.length - 1
) {

    practicalExamReadyToFinish = true;

    return;

}

    // الانتقال للسؤال التالي
    practicalQuestionNumber++;

    selectedAnswer = null;

    showPracticalQuestion();

});
practicalPreviousButton.addEventListener("click", function () {

    if (practicalQuestionNumber > 0) {

        practicalQuestionNumber--;

        showPracticalQuestion();

    }

});
backToChoice.addEventListener("click", function () {

    startScreen.classList.remove("hidden");

    nameScreen.classList.add("hidden");
    examScreen.classList.add("hidden");
    practicalScreen.classList.add("hidden");
    finishScreen.classList.add("hidden");
    resultsScreen.classList.add("hidden");
    certificateScreen.classList.add("hidden");

    hideBackToChoice();

});
if ("serviceWorker" in navigator) {

    window.addEventListener("load", function () {

        navigator.serviceWorker.register("./sw.js")
            .then(function (registration) {

                console.log(
                    "Service Worker registered:",
                    registration.scope
                );

            })
            .catch(function (error) {

                console.error(
                    "Service Worker registration failed:",
                    error
                );

            });

    });

}