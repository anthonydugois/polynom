import { connect } from "react-redux"
import Home from "./Home"

const mapStateToProps = (state) => state

export default connect(
  mapStateToProps
)(Home)
