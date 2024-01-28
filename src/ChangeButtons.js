import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ChangeButtons({ id, value, setValue, state }) {
  return (
    <div className="button-segment">
      <Input
        id={id + "-length"}
        startDecorator={
          <Button
            disabled={state.running}
            id={id + "-decrement"}
            onClick={() => {
              if (value > 1) {
                setValue(value - 1);
              }
            }}
          >
            <FontAwesomeIcon icon={faMinus} />
          </Button>
        }
        endDecorator={
          <Button
            disabled={state.running}
            id={id + "-increment"}
            onClick={() => {
              if (value < 60) {
                setValue(value + 1);
              }
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        }
        sx={{
          "--Input-decoratorChildHeight": "40px",
          "--Input-focusedThickness": "0px",
        }}
        variant="soft"
        value={value}
        type="text"
      />
    </div>
  );
}
