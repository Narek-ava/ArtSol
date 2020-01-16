<!DOCTYPE html>
<html>
<head>
    <style>
        table {
            background-color: #2a4a4e;
            height: 404px;
            width: 348px;
        }

        .calc-button {
            font-size: 26px;
            height: 100%;
            width: 100%;
            background-color: #5a514e;
            border-color: #aeaf82;
            border-radius: 12px;
            border-bottom: 6px solid #332e2e;
        }

        .calc-number-button {
            font-size: 19px;
            height: 100%;
            width: 100%;
            background-color: #5a514e;
            border-color: #aeaf82;
            border-radius: 12px;
            border-bottom: 6px solid #332e2e;
        }

        #result-input {

            height: 141px;
            width: 338px;
            background-color: #dab97cf7;
            border-radius: 21px;
            font-size: 72px;
            text-align: right;

        }

        #result {
            font-size: 26px;
            height: 65px;
            width: 100%;
        }

        #clear {
            font-size: 26px;
            background-color: #ffb122f7;
            border-bottom: 6px solid #ad7c22f7
        }

        #link-color {
            color: black;
        }

    </style>
</head>

<body style="background-color:#2a4a4e;">
<table align="center">
    <tr>
        <th colspan="4">

            <input id="result-input" disabled placeholder="0">

    </tr>
    <tr>
        <td>
            <button onclick="setValue(this)" value="1" class="calc-number-button" class="calc-button">1</button>
        </td>
        <td>
            <button onclick="setValue(this)" value="2" class="calc-number-button" class="calc-button">2</button>
        </td>
        <td>
            <button onclick="setValue(this)" value="3" class="calc-number-button" class="calc-button">3</button>
        </td>
        <td>
            <button onclick="setOperator(this)" value="-" class="calc-button">-</button>
        </td>
    </tr>

    <tr>
        <td>
            <button onclick="setValue(this)" value="4" class="calc-number-button" class="calc-button">4</button>
        </td>
        <td>
            <button onclick="setValue(this)" value="5" class="calc-number-button" class="calc-button">5</button>
        </td>
        <td>
            <button onclick="setValue(this)" value="6" class="calc-number-button" class="calc-button">6</button>
        </td>
        <td>
            <button onclick="setOperator(this)" value="+" class="calc-button">+</button>
        </td>
    </tr>

    <tr>
        <td>
            <button onclick="setValue(this)" value="7" class="calc-number-button" class="calc-button">7</button>
        </td>
        <td>
            <button onclick="setValue(this)" value="8" class="calc-number-button" class="calc-button">8</button>
        </td>
        <td>
            <button onclick="setValue(this)" value="9" class="calc-number-button" class="calc-button">9</button>
        </td>
        <td>
            <button onclick="setOperator(this)" value="*" class="calc-button">x</button>
        </td>
    </tr>

    <tr>
        <td>
            <button onclick="clearValues()" value="c" id="clear" class="calc-button">c</button>
        </td>
        <td>
            <button onclick="setValue(this)" value="0" class="calc-number-button" class="calc-button">0</button>
        </td>
        <td>
            <button onclick="setValue(this)" value="." class="calc-number-button" class="calc-button">.</button>
        </td>
        <td>
            <button onclick="setOperator(this)" value="/" class="calc-button">/</button>
        </td>
    </tr>
    <tr>
        <th colspan="2">
            <button onclick="calculate()" id="result" class="calc-button">=</button>
        </th>
        <th>
            <button onclick="setOperator(this)" value="^" class="calc-button">^</button>
        </th>
        <th>
            <button onclick="setOperator(this)" value="√" class="calc-button">√</button>
        </th>
    </tr>
</table>

<input type="hidden" id="value1">
<input type="hidden" id="operator">
<input type="hidden" id="value2">
<input type="hidden" id="result">


<script>
    document.addEventListener('DOMContentLoaded', function () {
        updateResultInput();
    });
    //todo rename variables
        function setValue(elem) {
            let newValue = elem.value;

            if (document.getElementById("operator").value) {
                let value2Elem = document.getElementById("value2");
                if (validateValue(value2Elem.value, newValue)) {
                    value2Elem.value += newValue;
                }
            } else {
                let value1Elem = document.getElementById("value1");
                console.log(value1Elem.value);
                if (validateValue(value1Elem.value, newValue)) {
                    value1Elem.value += newValue;
                }
            }

            updateResultInput();
            return true;
        }

        function setOperator(elem) {
            let operator = elem.value;

            if (!validateOperator(operator)) {
                return false;
            }

            document.getElementById("operator").value = operator;
            updateResultInput();
        }

        function updateResultInput() {
            let resultInputElem = document.getElementById("result-input");

            let value1 = document.getElementById("value1").value;
            let value2 = document.getElementById("value2").value;
            let operator = document.getElementById("operator").value;
            let result = "";

            if (value1) {
                result = result + value1;
            }

            if (operator) {
                result = result + operator;

                if (value2) {
                    result = result + value2;
                }
            }

            resultInputElem.value = result;

            return true;
        }

        function calculate() {
            let operatorElem = document.getElementById("operator");
            let value1Elem = document.getElementById("value1");
            let value2Elem = document.getElementById("value2");

            if (!value1Elem.value || !value2Elem.value || !operatorElem.value) {
                return true;
            }

          
           if (operatorElem.value === "^"){
               value1Elem.value=Math.pow(value1Elem.value, value2Elem.value);
               value2Elem.value = "";
               operatorElem.value = "";

               updateResultInput();
               updateResultInput();
           }
           if(operatorElem.value === "√"){
               value1Elem.value=Math.pow(value1Elem.value,1/value2Elem.value);
               value2Elem.value = "";
               operatorElem.value = "";


               updateResultInput();
           }
            value1Elem.value = eval(value1Elem.value + operatorElem.value + value2Elem.value);
            value2Elem.value = "";
            operatorElem.value = "";

            updateResultInput();
        }

        function validateOperator(operator) {
            let allowedOperators = ["+", "-", "/", "*","^","√"];
            return allowedOperators.includes(operator);

        }

        function validateValue(oldValue,value) {
            if (oldValue === "0" && value != ".") {
                return false;
            }

            let dotAvailable = new RegExp('\\.').test(oldValue);
            if (dotAvailable && value == ".") {
                return false;
            }

            return true;
        }


        function clearValues() {
            document.getElementById("value1").value = "";
            document.getElementById("operator").value = "";
            document.getElementById("value2").value = "";

            updateResultInput();
        }

</script>
<?php echo '<a href="logout.php" id="link-color"> Logout </a>'; ?><br>
<?php echo '<a href="delate account.php" id="link-color"> delate account </a>'; ?>

</body>
</html>

