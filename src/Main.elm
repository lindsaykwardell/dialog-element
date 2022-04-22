module Main exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (attribute, id, src, style, title)
import Html.Events exposing (..)
import Json.Decode as Decode


main : Program () Model Msg
main =
    Browser.sandbox
        { init =
            { dialogIsOpen = False
            }
        , update = update
        , view = view
        }


type alias Model =
    { dialogIsOpen : Bool }


type Msg
    = ToggleModal


update : Msg -> Model -> Model
update msg model =
    case msg of
        ToggleModal ->
            { model | dialogIsOpen = not model.dialogIsOpen }


view : Model -> Html Msg
view model =
    div [ id "content" ]
        [ img [ src "/logo.png", style "width" "300px" ] []
        , button [ onClick ToggleModal ] [ text "Toggle Modal" ]
        , dialog [ dialogIsOpen model.dialogIsOpen, onClose ToggleModal ]
            [ div [ attribute "slot" "content" ]
                [ text "I'm here!"
                , input [] []
                ]
            ]
        ]


dialog : List (Attribute Msg) -> List (Html Msg) -> Html Msg
dialog attrs children =
    node "dialog-wrapper" attrs children


dialogIsOpen : Bool -> Attribute Msg
dialogIsOpen isOpen =
    if isOpen then
        attribute "open" "true"

    else
        attribute "open" "false"


onClose : Msg -> Attribute Msg
onClose msg =
    on "close" (Decode.succeed msg)
